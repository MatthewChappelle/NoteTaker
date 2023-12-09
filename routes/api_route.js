const router = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all notes
router.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
    console.log(data);
});

// POST Route for new notes
router.post("/", (req, res) => {
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

module.exports = router;