// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const app = express();
const index = require("./assets/js/index.js") // possibly?

var PORT = process.env.PORT || 3005;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Data
const notes = require("../../../db/db.json");


// Routes
app.get("/", function(req, res) {
  res.json(path.join(__dirname, "./public/index.html"));
});


app.get("/api/notes/:id", function (req, res) {
  const id = req.params.id;

  // What does this log?
  console.log(existingNotes);

  // var varName = arrayName.filter(newVariableName => thing that needs to be true or false)
  // const chosenNote = notes.filter(noteObj => noteObj.title === chosen)
  // console.log(chosenChar[0]);

  res.end();
});


app.post("/api/notes", function (req, res) {

});


app.put("/:id", function (req, res) {
  
});


app.delete("/api/notes/:id", function (req, res) {
  console.log(req.params.id)
});


// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});