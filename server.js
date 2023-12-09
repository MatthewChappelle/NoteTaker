const express = require('express');
const path = require('path');
const apiroute = require('./routes/api_route');
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");
const uuid = require("./helpers/uuid");

//set up port
const PORT = process.env.PORT || 3001;
const app = express();

//set up express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//set up routes
app.use('/api', apiroute);

//set path to notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html')));

//set path to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html')));

//set path to db.json
app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/db/db.json')));


// GET Route for adding new note
app.post('/api/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    // If all the required properties are present
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        // readAndAppend function will read, parse, and push newNote to the array, stringify the array, then write it to the file
        readAndAppend(newNote, "./db/db.json");

        res.json(`Note added successfully`);
    } else {
        res.error("Error");
    }
});

//start server and link to port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`));