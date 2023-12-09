const fs = require('fs');
const util = require('util');

//set up read function
const readFromFile = util.promisify(fs.readFile);

/**
 * @param {string} 
 * @param {object}
 * @returns {void}
 */

//set up write function
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info('\nSent to ${destination}'));

/**
 * @param {object}
 * @param {string}
 * @returns {void}
 */

//set up append function
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parseData = JSON.parse(data);
            parseData.push(content);
            writeToFile(file, parseData);
        }
    });
};

//export functions
module.exports = { readFromFile, writeToFile, readAndAppend };