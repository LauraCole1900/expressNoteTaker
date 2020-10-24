// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuidv1 = require("uuidv1");
const util = require("util");
const app = express();

var PORT = process.env.PORT || 3005;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Data
const noteData = require("./db/db.json");


// Routes
// serves homepage
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// serves notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});



// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
// read db.json file
// return notes from db.json as JSON
app.get("/api/notes/", function (req, res) {
  readFileAsync("./db/db.json", "utf8").then(data => {
    JSON.parse(data);
    res.json(data);
    res.end();
  });
});


// POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
// when save button is clicked
// grab new note
// write new note to notes database
// return new note to be rendered to page
app.post("/api/notes", function (req, res) {
  const { title, text } = req.body;
  const newNote = { title, text, id: uuidv1() }
  noteData.push(newNote);
  res.send(noteData);
  writeFileAsync("./db/db.json", JSON.stringify(noteData), function (err) {
    res.end();
  });
  // readFileAsync("./db/db.json", "utf8").then(data => {
  //   return [...data, newNote];
  // }).then(updatedNotes => {
  //   return writeFileAsync("./db/db.json", JSON.stringify(updatedNotes));
  // }).then(() => res.json(newNote));
});


// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function (req, res) {
  const deleteId = req.params.id
  const newNoteData = req.body
  const remainingNotes = noteData.filter(noteObj => noteObj.id !== deleteId)
  remainingNotes.push(newNoteData)
  writeFileAsync("./db/db.json", JSON.stringify(noteData), function (err) {
    res.end();
  });
});


// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});