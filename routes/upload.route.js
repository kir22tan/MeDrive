const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const File = require("../models/file");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const router = express.Router();

// Store files locally in uploads/<userId>/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userUploadDir = path.join(__dirname, "../uploads", req.user.id.toString());
    if (!fs.existsSync(userUploadDir)) {
      fs.mkdirSync(userUploadDir, { recursive: true });
    }
    cb(null, userUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    const username = req.user.username;

    // Upload to Cloudinary with folder path by username
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `vaulta-uploads/${username}`,
      resource_type: "auto",
    });

    console.log(`Upload successful! File: ${file.originalname}, User: ${username}, URL: ${result.secure_url}`);

    // Save file metadata to DB
    const newFile = new File({
      filename: file.originalname,
      extension: path.extname(file.originalname).slice(1),
      cloudinaryURL: result.secure_url,
      uploadedBy: req.user.id,
    });

    await newFile.save();

    res.json({ message: "Upload successful", url: result.secure_url });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

router.get("/uploads", verifyToken, async (req, res) => {
  const files = await File.find({ uploadedBy: req.user.id }).sort({ uploadedAt: -1 });
  res.json(files);
});

module.exports = router;
