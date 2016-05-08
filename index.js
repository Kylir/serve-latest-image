'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const DEFAULT_DIR = '<Default Path Goes Here>';
const PORT = 8000;

const DIR = process.argv[2] ? process.argv[2] : DEFAULT_DIR; 

const server = http.createServer((req, res) => {
    //Basic error handling if anything goes wrong
    try {
        let file = latestFile(DIR);
        let content = fs.readFileSync(path.join(DIR, file));
        res.write(content);
    } catch (err) {
        console.error(err);
    }
    res.end();
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(PORT);

/**
Find the latest file of a directory.
Partly from: http://stackoverflow.com/a/10559790/672870
**/
function latestFile (dir) {
    //Retrieve the files
    let files = fs.readdirSync(dir);
    //Sort them
    files.sort((a, b) => {fs.statSync(path.join(dir, a)).mtime.getTime() - fs.statSync(path.join(dir, b)).mtime.getTime();});
    // Return the first one
    return files[0];
}