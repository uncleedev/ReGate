"use client";

import Modal from '@/components/portal/Modal';
import React, { useState, useEffect } from 'react';
import { forms } from '@/constants/forms';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

if (process.env.STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("STRIPE_PUBLISHABLE_KEY is not defined!")
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

export default function CreateRequest({ createModal, closeModal, user }) {
    const [formType, setFormType] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [loading, setLoading] = useState(false);

    const form = forms.find((form) => form.type === formType);

    useEffect(() => {
        if (form) {
            setPrice(form.price);
        }
    }, [formType, form]);

    const clearInputs = () => {
        setFormType("");
        setQuantity(0);
        setPaymentMethod("");
    };

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentNo: user.studentNo,
                    email: user.email,
                    formType,
                    quantity,
                    paymentMethod,
                    paymentStatus: false,
                    printStatus: "Pending"
                })
            });

            if (res.ok) {
                clearInputs();
                closeModal();
            }
        
        } catch (error) {
            console.error("Error submitting form: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={createModal} onClose={closeModal} title={"Create new request"}>
            <form className='flex flex-col gap-4' onSubmit={handleCreateRequest}>
                <div style={styles.group}>
                    <label style={styles.label} htmlFor="formType">Form Type</label>
                    <select
                        id="formType"
                        value={formType}
                        style={styles.input}
                        onChange={(e) => setFormType(e.target.value)}
                    >
                        <option value="" disabled>Select Form Type</option>
                        <option value="OVRF">OVRF</option>
                        <option value="FORM 137">Form 137</option>
                    </select>
                </div>

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, optio. Sapiente reiciendis fugit, magnam dolores beatae nemo quis ullam iste? Eum quisquam sunt sed inventore doloribus laboriosam, et quo aliquid?
                <div style={styles.group}>
                    <label style={styles.label} htmlFor="quantity">Quantity</label>
                    <input 
                        id="quantity"
                        style={styles.input} 
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>
                
                <div style={styles.group}>
                    <label style={styles.label} htmlFor="paymentMethod">Payment</label>
                    <select 
                        id="paymentMethod"
                        style={styles.input}
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="" disabled>Select your payment method</option>
                        <option value="Cash">Cash</option>
                        <option value="Online">Online</option>
                    </select>
                </div>

                <div className='flex items-center justify-between gap-3'>
                    <button 
                        type="button" 
                        onClick={() => {
                            clearInputs();  // Clear inputs on cancel
                            closeModal();
                        }} 
                        style={styles.button} 
                        className='bg-red-600'
                    >
                        Cancel
                    </button>
                    <button 
                        style={styles.button} 
                        className='bg-blue-600'
                        type='submit'
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

const styles = {
    label: {
        fontWeight: '700'
    },

    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: 'transparent',
    },

    group: {
        display: 'flex', 
        flexDirection: 'column',
        gap: "6px"
    },

    button: {
        width: '100%',
        padding: '12px',
        color: 'white',
        borderRadius: '6px',
    }
};