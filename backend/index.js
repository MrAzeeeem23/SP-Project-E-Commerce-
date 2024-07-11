import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import cors package

import connectDB from './config/db.js';
import userRoute from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from "./routes/productRoutes.js";
import upload from './routes/uploadRoutes.js'
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;
console.log(`Port: ${port}`);
connectDB();

const app = express();

app.use(cors({ origin: 'https://beatsstore.netlify.app/' }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use('/api/users', userRoute);
app.use('/api/category', categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/uploads", upload);
app.use("/api/orders", orderRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
