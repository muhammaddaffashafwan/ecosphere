import multer from 'multer';

// Define allowed image types and max file size (for example, 5MB)
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Create multer disk storage configuration (you can adjust the destination as needed)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/forum_images/'); // Specify the folder to store the image
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
  },
});

// File filter function to validate file types
const fileFilter = (req, file, cb) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
  cb(null, true);
};

// Multer middleware for image upload validation
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE, // Max file size (in bytes)
  },
  fileFilter,
});

// Middleware to validate the uploaded image
const checkImageUrl = (req, res, next) => {
  // If no file is uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }

  // Proceed to the next middleware or route handler
  next();
};

// Export the middleware and upload configuration
export { upload, checkImageUrl };
