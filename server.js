const notes = require("../../../db/db.json");
const express = require("express");
const path = require("path");
const fs = require("fs");

var PORT = process.env.PORT || 3005;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function(req, res) {
  res.json(path.join(__dirname, "./public/index.html"));
});




// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});