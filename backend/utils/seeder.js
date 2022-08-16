import productModel from "../models/productModel.js";
import dotenv from 'dotenv'
import connectDatabase from '../config/database.js'
import product from '../data/product.json' assert {type: "json"};
// setting up of dotenv file

dotenv.config({ path: 'config/config.env' })

connectDatabase()

const seedProducts = async () => {
    try {
        await productModel.deleteMany()
        console.log('products are deleted');

        await productModel.insertMany(product)
        console.log('all products are added');

        process.exit()
    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedProducts()