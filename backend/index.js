// Import packages
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import userRoute from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'


dotenv.config();

const port = process.env.PORT || 5000;
console.log(`Port: ${port}`);
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use('/api/users', userRoute);
app.use('/api/category', categoryRoutes)


app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
