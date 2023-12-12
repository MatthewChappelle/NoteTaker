const fs = require('fs');
const util = require('util');
const DB_PATH = "./db/db.json";

//set up write function
const writeToFile = (content) =>
    fs.writeFile(DB_PATH, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info('Wrote to File'));

//set up read function for readAndAppend and deleteNote
const readFile = () => {
    let noteInfo = fs.readFileSync(DB_PATH);
    return JSON.parse(noteInfo);
};

//set up append function
const readAndAppend = (content) => {
    let noteInfo = readFile();
    noteInfo.push(content);
    writeToFile(noteInfo);
};

//added delete functionality
const deleteNote = (id) => {
    let noteInfo = readFile();
    for (let i = 0; i < noteInfo.length; i++) {
        if (noteInfo[i].id === id) {
            noteInfo.splice(i, 1);
            break;
        };
    };
    writeToFile(noteInfo);
    console.log(`Deleted, Note ${id}`);
};

//export functions
module.exports = { readAndAppend, deleteNote };