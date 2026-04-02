const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:/Office/JFMS/JFMS_Jamaat_End_User_Roles_Responsibilities_E2E_Flow.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('c:/Office/JFMS/roles_flow.txt', data.text);
    console.log('PDF extracted successfully to roles_flow.txt');
});
