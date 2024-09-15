const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies["token"];
  // console.log(token)
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const id = decoded.userId;
    //Can be removed in future
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials!' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
