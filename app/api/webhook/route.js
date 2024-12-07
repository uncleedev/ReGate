import { NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from "mongoose";
import { connectMongoDB } from "./path/to/your/mongodb/connection"; // Adjust the path as necessary
import CheckoutSession from "./models/CheckoutSession"; // Import your CheckoutSession model
import Order from "./models/Order"; // Import your Order model

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia'
});

// Connect to MongoDB
connectMongoDB();

export async function POST(request) {
    const rawBody = await request.text(); // Get the raw body of the request
    const sig = request.headers.get("stripe-signature"); // Get the Stripe signature
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Your webhook secret

    let event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (error) {
        console.error("Webhook signature verification failed:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed":
            const saveSession = await handleCompletedCheckoutSession(event);
            if (!saveSession) {
                return NextResponse.json({ error: 'Unable to save checkout session' }, { status: 500 });
            }
            break;
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 }); // Acknowledge receipt of the event
}

const handleCompletedCheckoutSession = async (event) => {
    try {
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ["line_items"]
            }
        );

        const lineItems = sessionWithLineItems.line_items;

        if (!lineItems || lineItems.data.length === 0) return false;

        const ordersFulfilled = await fullFillOrder(
            lineItems.data,
            event.data.object.customer_details.email
        );

        await saveCheckoutSession(event.data.object);

        if (ordersFulfilled) return true;

        console.error(
            'Error fulfilling orders for',
            JSON.stringify(lineItems),
            JSON.stringify(event.data.object)
        );

        return false;
    } catch (error) {
        console.error("Error handling completed checkout session:", error);
        return false;
    }
}

const fullFillOrder = async (data, customerEmail) => {
    try {
        // Assuming you have a Mongoose model for Order
        for (const item of data) {
            const order = new Order({
                email: customerEmail,
                productId: item.price.product,
                quantity: item.quantity,
                // Add other relevant fields as necessary
            });
            await order.save(); // Save each order to the database
        }

        return true; // Return true if all orders are fulfilled successfully
    } catch (error) {
        console.error("Error fulfilling order:", error);
        return false; // Return false if there was an error
    }
}

const saveCheckoutSession = async (session) => {
    try {
        // Assuming you have a Mongoose model for CheckoutSession
        const checkoutSession = new CheckoutSession(session);
        await checkoutSession.save(); // Save the checkout session to your database
    } catch (error) {
        console.error("Error saving checkout session:", error);
    }
}