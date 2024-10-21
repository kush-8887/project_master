const express = require('express');
var app = express();

//req moduless
const cookieParser = require('cookie-parser')
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

require('dotenv').config();

//Routes
const loginRoutes = require('./routes/login/login');
const csv_upload = require('./routes/dashboard/csv_upload');
const quantity_data = require('./routes/dashboard/quantity_data');
const price_data = require('./routes/dashboard/price_data');
const current_data = require('./routes/dashboard/current_data');
const price_data_pie = require('./routes/dashboard/price_data_pie');
const quantity_data_line = require('./routes/dashboard/quantity_data_line');
const get_predictions = require('./routes/dashboard/price_prediction');
const { authMiddleware } = require('./middleware/auth');

//PORT 
var port = process.env.SERVER_PORT || 9000;

//Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

//Mongo Connection
const mongoRoute = process.env.MONGOURL;
mongoose
  .connect(`${mongoRoute}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Routes
app.use("/",loginRoutes);
app.use("/",csv_upload);
app.use("/",quantity_data);
app.use("/",price_data);
app.use("/",current_data);
app.use("/",price_data_pie);
app.use("/",quantity_data_line);
app.use("/",get_predictions);

// auth route for React
app.get('/verify', authMiddleware, (req, res) => {
  res.status(200).json({ msg: 'Token is valid', user: req.user });
});


app.listen(port ,() => {
    console.log(`Server is listening on ${port}`);
});