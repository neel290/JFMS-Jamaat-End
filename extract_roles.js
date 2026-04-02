import fs from 'fs';
import pdf from 'pdf-parse';

async function extract() {
    let dataBuffer = fs.readFileSync('c:/Office/JFMS/JFMS_Jamaat_End_User_Roles_Responsibilities_E2E_Flow.pdf');
    try {
        const data = await pdf(dataBuffer);
        fs.writeFileSync('c:/Office/JFMS/roles_flow.txt', data.text);
        console.log('PDF extracted successfully to roles_flow.txt');
    } catch (err) {
        console.error('Error parsing PDF:', err);
    }
}

extract();
