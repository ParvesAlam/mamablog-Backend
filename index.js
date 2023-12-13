const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const cors = require("cors")
const connectDB = require("./db");
require('dotenv').config();


mongoose.set('strictQuery', true);

const allRoutes = require("./routes/index");


const app=express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use("/api/", allRoutes);



const port = process.env.PORT || 4000 

app.listen(port, (req, res) => {
    console.log(`app is listening to PORT ${port}`)
    connectDB()
  })