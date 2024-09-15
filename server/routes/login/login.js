const express = require("express");
const jwt = require("jsonwebtoken");
const User = require('../../models/user.js');
const crypto = require("crypto");
const sendEmail = require("../../services/email.js");
const router = express.Router();
require('dotenv').config();

router.post("/signup", async (req, res) => {
  const { fullName, companyName, email, password } = req.body;
  console.log(fullName, companyName, email, password);

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ fullName, companyName, email, password });
    const verificationToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = verificationToken;
    user.isVerified = false;

    await user.save();

    sendEmail({
      to: email,
      subject: "Verify your email",
      text: `Click on this link to verify your email: http://localhost:5173/verify/${verificationToken}`,
    });

    console.log("signup");
    

    res.status(201).json({ msg: "User registered. Please verify your email." });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password , "login.js log");

  try {
    let user = await User.findOne({ email });
    // console.log(user , "login.js log");
    
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!user.isVerified) {
      console.log("user not verified!");
      
      return res
        .status(403)
        .json({ msg: "Please verify your email to login." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "24h" });

    res.cookie("token", token, {
      httpOnly: true, // Cannot be accessed via JavaScript
      secure: false, // Only sent over HTTPS
      sameSite: "lax", // Prevents CSRF
    });
    res.status(200).json({ msg: "Logged in successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/verify/:token", async (req, res) => {
  console.log(req.params);
  
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) {
      return res.status(400).json({ msg: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    console.log("EMail verified!");
    
    /* 
        THIS CODE WORKS , 
        THE SERVER RETURNS 200 BUT 400 IS ALSO RETURNED
        EMAIL GETS VERFIED BUT ERROR PAGE IS RENDERED
    */

    res.status(200).json({ msg: "Email verified successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // maybe required in future idk
    sendEmail({
      to: email,
      subject: "Password Reset",
      // text: `Click on this link to reset your password: http://localhost:${PORT}/reset/${resetToken} `,
      text: `Click on this link to reset your password: http://localhost:8000/reset/${resetToken}`,
    });

    res.status(200).json({ msg: "Password reset link sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/reset/:token", async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ msg: "Password reset successfully" });
  } catch (err) {
    res.status(500).send("Server error");
    console.error(err.message);
  }
});


module.exports = router;