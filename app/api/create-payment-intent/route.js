import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { amount } = await request.json();  // Corrected spelling from 'ammount' to 'amount'

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({  // Corrected 'paymentIntent' to 'paymentIntents'
            amount: amount,  // Corrected spelling from 'ammount' to 'amount'
            currency: "php",  // Changed 'pesos' to 'php'
            automatic_payment_methods: { enabled: true }
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Internal error: ", error);  // Use console.error for error logging

        return NextResponse.json({ error: `Internal error: ${error.message}` }, { status: 500 });
    }
}