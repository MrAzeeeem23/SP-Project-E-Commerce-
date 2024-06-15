// Import packages
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import userRoute from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Debugging line to check if .env file is loaded correctly
console.log('Environment variables loaded:', process.env);

// Define port from environment variable or use default
const port = process.env.PORT || 5000;
console.log(`Port: ${port}`); // Debugging line

// Connect to the database
connectDB();

// Initialize Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use('/api/users', userRoute);

// Debugging line to check specific environment variable
// console.log(`JWT Secret: ${process.env.JWT_SECRET}`);

// Define root route
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Start server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
