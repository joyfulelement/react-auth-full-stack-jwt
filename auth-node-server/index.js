const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// DB setup
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Mongo DB connected!");
});
mongoose.connect("mongodb://localhost/auth"); //create new db called 'auth'

// App setup - add middleware
app.use(morgan("combined")); // for logging
app.use(bodyParser.json({ type: "*/*" })); // parsed as JSON
router(app);

// Server setup - getting express server talking to outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server is listening on:", port);
