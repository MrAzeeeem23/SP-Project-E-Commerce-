import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    next();
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      console.log('Token found, verifying...');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified, decoding user ID:', decoded.userId);
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        console.error('User not found');
        res.status(401);
        throw new Error("Not authorized, user not found.");
      }

      console.log('User authenticated:', req.user._id);
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ message: "Not authorized, token failed." });
    }
  } else {
    console.error('No token provided');
    res.status(401).json({ message: "Not authorized, no token." });
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    console.log('User is admin:', req.user._id);
    next();
  } else {
    console.error('Not authorized as an admin');
    res.status(401).json({ message: "Not authorized as an admin." });
  }
};

export { authenticate, authorizeAdmin };

