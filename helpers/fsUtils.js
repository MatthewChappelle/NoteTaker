const fs = require('fs');
const util = require('util');
const DB_PATH = "./db/db.json";
//set up read function
const readFromFile = util.promisify(fs.readFile);

/**
 * @param {string} 
 * @param {object}
 * @returns {void}
 */

//set up write function
const writeToFile = (content) =>
    fs.writeFile(DB_PATH, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info('\nSent to ${destination}'));

/**
 * @param {object}
 * @param {string}
 * @returns {void}
 */

const readFile = () => {
    let noteInfo = fs.readFileSync(DB_PATH);
    return JSON.parse(noteInfo);
};

//set up append function
const readAndAppend = (content) => {
    let noteInfo = readFile();
    noteInfo.push(content);
    writeToFile(noteInfo);
    console.log('read and appended');
};

const deleteNote = (id) => {
    let noteInfo = readFile();
    for (let i = 0; i < noteInfo.length; i++) {
        if (noteInfo[i].id === id) {
            noteInfo.splice(i, 1);
            break;
        };
    };
    writeToFile(noteInfo);
};

//export functions
module.exports = { readAndAppend, deleteNote };