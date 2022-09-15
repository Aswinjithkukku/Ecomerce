import Stripe from "stripe"
const stripe = Stripe('sk_test_51Lhes6SHhD85X919LmHAjpgPa0RVdpNgDLCWqjCif0hDS6GtObdx17w19Y4NDQtfKE6AVoViWKghlbLKvoRkzCUn00htCi4POA');

import { catchAsyncErrors } from "../middlewares/catchAsyncError.js"

// process stripe payment => /api/v1/payment/process
export const processPayment = catchAsyncErrors( async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        description: 'Software development services',
        shipping: {
            name: 'Jenny Rosen',
            address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
            },
          },

        metadata: { integration_check: 'accept_a_payment'}
    })
    
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

// send stripe api key => /api/v1/payment/process
export const sendStripeApi = catchAsyncErrors( async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})