const fs = require('fs');

function logError(error) {
   
    console.error(error);

 
    const logMessage = `${new Date().toISOString()}: ${error}\n`;

    fs.appendFile('error.log', logMessage, (err) => {
        if (err) {
            console.error('Error logging to file:', err);
        }
    });
}

module.exports = {
    logError
    
}