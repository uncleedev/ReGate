"use client"
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'

const CheckoutPage = ({amount}) =>  {

    const stripe = useStripe()
    const elements = useElements()

    const [errorMessage, setErrorMessage] = useState()
    const [clientSecret, setClientSecret] = useState("")
    const [loading, setLoading] = useState( false)

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount })
        })

        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
    }, [amount])

    return (
        <form>
            <PaymentElement />
            <button>Pay</button>
            <button>Pay</button>
            <button>Pay</button>
            <button>Pay</button>
            <button>Pay</button>
            <button>Pay</button>
        </form>
    )
}

export default CheckoutPage
