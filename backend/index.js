//pakages 
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js'
import userRoute from './routes/userRoutes.js'

dotenv.config()

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoute)

app.get('/', (req, res) => {
    res.send("hello world")
})
app.listen(port, () => console.log(`server is runnig on port :- ${port}`))
