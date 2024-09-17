import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

const router = express.Router();

// Multer Configuration for Local Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store locally in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`); // Generate a unique file name
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

// Route to Handle Image Upload and Cloudinary Integration
router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    } else if (req.file) {
      try {
        const filePath = req.file.path;

        // Upload the image to Cloudinary from the local file path
        const result = await uploadOnCloudinary(filePath);

        // Optionally delete the local file after Cloudinary upload

        // Respond with Cloudinary URL
        res.status(200).send({
          message: "Image uploaded successfully",
          image: result.secure_url,  // Cloudinary secure URL
        });
      } catch (cloudinaryErr) {
        res.status(500).send({ message: "Cloudinary upload failed", error: cloudinaryErr });
      }
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
