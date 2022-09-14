import Stripe from "stripe"
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js"

// process stripe payment => /api/v1/payment/process
export const processPayment = catchAsyncErrors( async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntent.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment'}
    })

    res.status(200).json({
        success: true,
        client_Secret: paymentIntent.client_Secret
    })
})

// send stripe api key => /api/v1/payment/process
export const sendStripeApi = catchAsyncErrors( async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})