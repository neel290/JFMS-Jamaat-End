const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:/Office/JFMS/JFMS_BRD_V1 (1).pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('c:/Office/JFMS/brd.txt', data.text);
    console.log('PDF extracted successfully to brd.txt');
});
