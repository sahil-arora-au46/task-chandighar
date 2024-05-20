const fs = require('fs');

// Function to log errors to console and file
function logError(error) {
    console.error(error);

    // Create a log message with timestamp
    const logMessage = `${new Date().toISOString()}: ${error}\n`;

    // Append the log message to error.log file
    fs.appendFile('error.log', logMessage, (err) => {
        if (err) {
            console.error('Error logging to file:', err);
        }
    });
}

module.exports = {
    logError
};
