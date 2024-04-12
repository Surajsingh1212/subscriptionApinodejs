require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/subscriptionDB")

const app = express()
const port = process.env.SERVER_PORT | 3000

app.use(express.json())

const subscriptionRoutes = require('./routes/subscriptionRoute');
const userRoutes = require('./routes/authRoutes');
// Routes
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.listen(port,()=>{
    console.log("Server running on port "+port)
})