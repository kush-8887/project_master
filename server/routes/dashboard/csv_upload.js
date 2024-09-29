const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { authMiddleware } = require("../../middleware/auth"); // Assuming this is correct
const { getUserId } = require("../../services/user_id");
const { get_err } = require('../../services/python_err');
const { spawn } = require('child_process');

require('dotenv').config();

const storagePath = "./public/uploads/";
const mongoURL = process.env.MONGOURL;
const dbName = process.env.dbName

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath); // Directory to save uploaded files
  },
  filename: async (req, file, cb) => {
    try {
      const userID = await getUserId(req);
      
      if (userID === undefined) {
        throw new Error("UserID not defined!");
      }

      // Construct the file path using the userID
      const filePath = `public/uploads/${userID}.csv`;

      // Check if a file with the same name already exists and delete it
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Set the file name using userID
      cb(null, `${userID}.csv`);
    } catch (error) {
      console.error("Error in filename:", error);
      cb(new Error("Failed to decode token or process filename"));
    }
  },
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

// CSV upload route with authMiddleware
router.post("/upload-csv", authMiddleware, upload.single("myfile"), async (req, res) => {
  if (req.file) {
      const userId = await getUserId(req);
      const pythonScriptPath = "./python/status.py"; // Path to your Python script

      console.log(userId,storagePath,mongoURL,dbName)

      // Spawn a child process to run the Python script
      const pythonProcess = spawn("python", [pythonScriptPath, userId, storagePath, mongoURL, dbName]);

      let scriptOutput = "";

      // Capture the output from the Python script
      pythonProcess.stdout.on("data", (data) => {
          scriptOutput += data.toString(); 
      });

      // Capture the error output from the Python script
      pythonProcess.stderr.on("data", (data) => {
          console.error(`Error from Python script: ${data.toString()}`);
          // Send the error response only if there is an error in the Python script
          if (!res.headersSent) {
              res.status(500).json({ error: "Failed to execute Python script" });
          }
      });

      // When the Python process finishes
      pythonProcess.on("close", async (code) => {
          console.log(scriptOutput)
          if (code === 0) {
              if (!res.headersSent) {
                  if(scriptOutput.trim() === "File processed successfully"){
                    res.json({ message : scriptOutput.trim() });
                  }
                  else{
                    const msg = await get_err(scriptOutput.trim())                  
                    res.json({ message : msg });
                  }
              }
          } else {
              // If the Python process exits with a non-zero code, handle it as an error
              console.error(`Python script exited with code ${code}`);
              if (!res.headersSent) {
                  res.status(500).json({ error: `Python script failed with code ${code}` });
              }
          }
      });
  } else {
      console.log("No file uploaded");
      res.status(400).send("Error: No file uploaded");
  }
});


module.exports = router;
