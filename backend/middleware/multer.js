const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "employee_profiles", // Folder in Cloudinary
        allowedFormats: ["jpg", "png", "jpeg"]
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
