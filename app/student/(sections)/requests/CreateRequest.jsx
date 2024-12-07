"use client";

import Modal from '@/components/portal/Modal';
import React, { useState, useEffect } from 'react';
import { forms } from '@/constants/forms';

import CheckoutPage from './CheckoutPage';
import { redirect, useRouter } from 'next/navigation';
import { products } from '@/constants/products';


export default function CreateRequest({ createModal, closeModal, user }) {
    const [formType, setFormType] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

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

        if (formType === 'Sample1'  && paymentMethod === 'Online') {
            router.push(products.Sample1)
        }

        if (formType === 'Sample2'  && paymentMethod === 'Online') {
            router.push(products.Sample2)
        }

        if (formType === 'Sample3'  && paymentMethod === 'Online') {
            router.push(products.Sample3)
        }

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
                    paymentStatus: paymentMethod === "Online" ? true : false,
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
                        <option value="Sample1">Sample1</option>
                        <option value="Sample2">Sample2</option>
                        <option value="Sample3">Sample3</option>
                    </select>
                </div>

                <div style={styles.group}>
                    <label style={styles.label} htmlFor="quantity">Quantity</label>
                    <input 
                        id="quantity"
                        style={styles.input} 
                        type="number"
                        value={quantity}
                        min={"0"}
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
                            clearInputs();
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
                        {loading ? "Loading..." : paymentMethod === 'Online' ?  `Pay ${quantity ? `₱${(quantity * price).toFixed(2)}` : ""}` : "Submit"}
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