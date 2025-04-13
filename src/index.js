
const Subject = require('./core/client.js');
const client = new Subject()
require('dotenv').config();
const { default: chalk } = require('chalk');
const { eventsHandler } = require('./Handlers/EventHandler.js');
const fs = require('fs');
const path = require('path');
const errorsDir = path.join(__dirname, '../logs/errors');
const { checkMissingIntents } = require('./Handlers/requiredIntents.js');
const { antiCrash } = require('./Handlers/antiCrash.js');

antiCrash();

require('./Handlers/watchFolders.js');

function ensureErrorDirectoryExists() {
    if (!fs.existsSync(errorsDir)) {
        fs.mkdirSync(errorsDir);
    }
}
function logErrorToFile(error) {
    ensureErrorDirectoryExists();

    const errorMessage = `${error.name}: ${error.message}\n${error.stack}`;

    const fileName = `${new Date().toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(errorsDir, fileName);

    fs.writeFileSync(filePath, errorMessage, 'utf8');
}


(async () => {
    
        await client.login(process.env.TOKEN).catch((error) => {
            console.error(chalk.red.bold('ERROR: ') + 'Failed to login!');
            console.error(chalk.red(error));
            logErrorToFile(error);
        });
        if (client.user) {
            console.log(chalk.green.bold('SUCCESS: ') + 'Bot logged in successfully!');
        } else {
            console.error(chalk.red.bold('ERROR: ') + 'Failed to login!');
            return;
        }
        require('./Handlers/functionHandler.js');

        //Load Events
        const eventsPath = './events';

        await eventsHandler(client, path.join(__dirname, eventsPath));
        checkMissingIntents(client);

})();