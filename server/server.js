import './config/instrument.js'
import express from 'express'

import cors from 'cors'

import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/mode"
import companyRoutes from './routes/companyRoutes.js'
const app=express();
// connect to database
// middlewares

app.use(cors())

app.use(express.json())

// routes

app.get('/',(req,res)=>res.send("Api calling"))

app.get("/debug-sentry",function mainHandler(req,res){
    throw new Error("My first sentry error!")
})
app.post('/webhooks',clerkWebhooks)
app.use('/api/company',companyRoutes)
// port

const PORT=process.env.PORT || 3000

    Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{

    console.log(`Server is running ${PORT}`)
})



