const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "backend/uploads"); // Folder where images will be stored
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` // Unique filename with timestamp
    );
  },
});

// Function to check file types
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/; // Allowed file extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images only!"); // If file type is not allowed
  }
}

// Initialize multer with file type check
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Define the POST route for image upload
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }
  // Construct full image URL for the response
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({
    message: "Image uploaded successfully",
    image: imageUrl, // Full image URL returned
  });
});

// Export the router
module.exports = router;
