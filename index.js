import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from "passport";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";
import connectDB from "./config/database.js";
import cookieParser from 'cookie-parser';
import session from "express-session";
import MongoStore from 'connect-mongo';
// const MongoStore =  connectMongo(session);

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
// app.use(cors())


//Passport config
import passportFunction from './config/passport.js';
// console.log("🚀 ~ file: index.js:43 ~ passportFunction:", passportFunction)

passportFunction(passport)
// console.log("🚀 ~ file: index.js:43 ~ a:")


//Allow requests from frontend
app.use(
    cors({
      origin: process.env.FRONT_END_LOCAL,
      credentials: true,
    })
  );

connectDB();

app.use(cookieParser("keyboard cat"))

// Sessions
app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
      proxy: true,
      cookie: {
        sameSite: process.env.ENV == "production" ? 'none' : 'lax',
        secure: process.env.ENV == "production" ? true : ""
      },
      store: new MongoStore({ mongooseConnection: mongoose.connection,
        mongoUrl: process.env.MONGO_URL 
      }),
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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
    // Loop through each user record and use save method so that it triggers the password hashing process. Now, hashed password is saved for each user

    //  dataUser.forEach(user => {
    //      let currentUser = new User(user)
    //      currentUser.save()
    //  })
// -------------------------------------------------------
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)

});

