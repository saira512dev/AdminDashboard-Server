import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { now } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";
import connectDB from "./config/database.js";

//data imports
import User from "./models/User.js"
import Product from "./models/Product.js"
import ProductStat from "./models/ProductStat.js"
import Transaction from "./models/Transaction.js"
import OverallStat from "./models/OverallStat.js"
import AffiliateStat from "./models/AffiliateStat.js"

import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat} from "./data/index.js"

// CONFIGURATION
dotenv.config({ path: "./config/.env" });
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

connectDB();

// ROUTES
app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/sales", salesRoutes)
app.use("/management", managementRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}, you better catch it!`);

    //Only add data once
    // AffiliateStat.insertMany(dataAffiliateStat)
    // OverallStat.insertMany(dataOverallStat)
// ------------------------------------------------------
    // Loop through each user record and use save method so that it triggers the password hashing process
    // now, hashed password is saved for each user

    //  dataUser.forEach(user => {
    //      let currentUser = new User(user)
    //      currentUser.save()
    //  })
// -------------------------------------------------------
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)

});

