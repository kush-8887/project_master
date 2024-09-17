const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require('../../middleware/auth'); // Assuming this is correct

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        try {
            const token = req.cookies.token; 
            if (!token) {
                return cb(new Error('No token found in cookies'));
            }

            const decoded = jwt.verify(token, 'your_jwt_secret'); 
            const userID = decoded.userId;

            // Construct the file path using the userID
            const filePath = `public/uploads/${userID}.csv`;

            // Check if a file with the same name already exists and delete it
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            // Set the file name using userID
            cb(null, `${userID}.csv`);
        } catch (error) {
            console.error('Error in filename:', error);
            cb(new Error('Failed to decode token or process filename'));
        }
    }
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

// CSV upload route with authMiddleware
router.post('/upload-csv', authMiddleware, upload.single('myfile'), (req, res) => {
    if (req.file) {
        
        //python script will be invoked here for further processing and validation of the csv file.
        //More error messages based on python script error and naming convention error to be reported to the user

        // Respond with a success message
        res.status(200).send('CSV file uploaded successfully!');
    } else {
        console.log('No file uploaded');
        res.status(400).send('Error: No file uploaded');
    }
});

module.exports = router;
