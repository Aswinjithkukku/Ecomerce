import app from './app.js'
import connectDatabase from './config/database.js'

import dotenv from'dotenv'
import cloudinary from 'cloudinary'

// Handle uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR:${err.message}`);
    console.log('Server down due to Uncaught exception');
    process.exit(1)
})
// setting up of config file path
if(process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({ path: 'config/config.env' })
}

// connecting to database
connectDatabase()

// Setting Up Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

// Handle Unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR:${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1)
    })
})