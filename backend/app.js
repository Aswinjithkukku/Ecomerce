import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'

import {errorMiddleware} from "./middlewares/error.js"

app.use(express.json())
app.use(cookieParser())

// import all routes
import products from './routes/product.js'
import user from './routes/user.js'
import order from './routes/order.js'

app.use('/api/v1', products)
app.use('/api/v1', user)
app.use('/api/v1', order)

// middleware to handle errors
app.use(errorMiddleware)

export default app