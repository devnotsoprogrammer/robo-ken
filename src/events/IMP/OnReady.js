const { ActivityType } = require("discord.js");
const { default: chalk } = require('chalk');
const path = require('path');
const fs = require('fs')
// const mongodbURL = config.database.mongodbUrl;

const errorsDir = path.join(__dirname, '../../../logs/errors');
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
    }
}