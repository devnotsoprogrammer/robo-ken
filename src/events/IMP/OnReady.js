const { ActivityType } = require("discord.js");
// @ts-ignore
const {prefixHandler} = require('../../Handlers/prefixcommand');
const {handleCommands} = require('../../Handlers/commandHandler');
const { default: chalk } = require('chalk');
const path = require('path');
const fs = require('fs')
// const mongodbURL = config.database.mongodbUrl;

const errorsDir = path.join(__dirname, '../../../errors');
function ensureErrorDirectoryExists() {
    if (!fs.existsSync(errorsDir)) {
        fs.mkdirSync(errorsDir);
    }
}

function logErrorToFile(error) {
    ensureErrorDirectoryExists();

    // Convert the error object into a string, including the stack trace
    const errorMessage = `${error.name}: ${error.message}\n${error.stack}`;

    const fileName = `${new Date().toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(errorsDir, fileName);

    fs.writeFileSync(filePath, errorMessage, 'utf8');
}

module.exports = {
    name: 'onReady',
    once: true,
    execute(client) {
        console.log(chalk.green.bold('INFO: ') + 'Bot is ready and connected to Discord!');

        client.user.setPresence({
            activities: {
                name: 'with your commands',
                type: ActivityType.Playing,
            },
            status: 'dnd'
        })

        prefixHandler(client, path.join(process.cwd(), 'src/messages'));
        handleCommands(client, path.join(process.cwd(), 'src/commands'));


    }
}