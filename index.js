const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts")

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db"));

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.listen(3005, () => console.log("server up and running"));
