const router = require("express").Router();
const { readAndAppend, deleteNote } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all notes
router.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
    console.log(data);
});

// GET Route for adding new note
router.post('/notes', (req, res) => {
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

// DELETE Route for deleting notes in database based on id
router.delete('/notes/:id', (req, res) => {
    console.log("router");
    let id = req.params.id;
    deleteNote(id);
    res.send('Deleted, Note ${req.params.id}');
});



module.exports = router;