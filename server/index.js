const express = require('express');
var app = express();

//req moduless
const cookieParser = require('cookie-parser')
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

require('dotenv').config();

//Routes
const loginRoutes = require('./routes/login/login')

//PORT 
var port = process.env.SERVER_PORT || 9000;

//Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

//Mongo Connection

mongoose
  .connect("mongodb://0.0.0.0:27017/auth-system")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Routes
app.use("/",loginRoutes)

app.listen(port ,() => {
    console.log(`Server is listening on ${port}`);
});