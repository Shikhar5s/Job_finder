
import dotenv from 'dotenv';
dotenv.config();
console.log("MONGO URI:", process.env.MONGODB_URI);
import './config/instrument.js'
import express from 'express'

import cors from 'cors'


import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import companyRoutes from './routes/companyRoutes.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import connectCloudinary from './config/cloudinary.js'

import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'

import {clerkMiddleware} from '@clerk/express'

const app=express();
// connect to database
// middlewares
await connectDB();
await connectCloudinary();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



// routes
//sapp.use(Sentry.Handlers.errorHandler());

app.post('/test-backend', express.json(), (req, res) => {
    console.log('📦 /test-backend req.body:', req.body);
    res.json({ received: req.body });
  });

app.get('/',(req,res)=>res.send("Api calling"))

app.get("/debug-sentry",function mainHandler(req,res){
    throw new Error("My first sentry error!")
})
app.post('/webhooks',clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)

  
app.use('/api/users',clerkMiddleware(),userRoutes)
// port


const PORT=process.env.PORT || 5000;

    Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{

    console.log(`Server is running ${PORT}`)
})



