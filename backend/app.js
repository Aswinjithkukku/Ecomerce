import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import dotenv from'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setting up of config file path
// dotenv.config({ path: 'config/config.env' })
if(process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({ path: 'config/config.env' })
} 

import {errorMiddleware} from "./middlewares/error.js"

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(fileUpload())

// import all routes
import products from './routes/product.js'
import user from './routes/user.js'
import order from './routes/order.js'
import payment from './routes/payment.js'

app.use('/api/v1', products)
app.use('/api/v1', user)
app.use('/api/v1', payment)
app.use('/api/v1', order)

if(process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*' , (req,res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// middleware to handle errors
app.use(errorMiddleware)

export default app