import multer from "multer";

// Configure Multer to store files in memory
export const upload = multer({
  storage: multer.memoryStorage(), // Store the file in memory
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});
