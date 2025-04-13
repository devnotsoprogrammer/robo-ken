require('dotenv').config();

const config = {
    bot: {
        token: process.env.BOT_TOKEN,
        id: process.env.BOT_ID || "BOT_ID",
        admins: [
            process.env.ADMIN_1 || "ADMIN_1",
            process.env.ADMIN_2 || "ADMIN_2"
        ],
        ownerId: process.env.BOT_OWNER_ID || "BOT_OWNER_ID",
        developerCommandsServerIds: [
            process.env.DEV_SERVER_ID || "ONLY_DEV_COMMANDS_SERVER_IDS"
        ]
    },
    database: {
        mongodbUrl: process.env.MONGODB_URL || "YOUR_MONGODB_URL"
    },
    logging: {
        guildJoinLogsId: process.env.GUILD_JOIN_LOGS_CHANNEL_ID || "GUILD_JOIN_LOGS_CHANNEL_ID",
        guildLeaveLogsId: process.env.GUILD_LEAVE_LOGS_CHANNEL_ID || "GUILD_LEAVE_LOGS_CHANNEL_ID",
        commandLogsChannelId: process.env.COMMAND_LOGS_CHANNEL_ID || "COMMAND_LOGS_CHANNEL_ID",
        errorLogs: process.env.ERROR_LOGS_WEBHOOK_URL || "YOUR_WEBHOOK_URL"
    },
    prefix: {
        value: process.env.BOT_PREFIX || "!"
    }
};

module.exports = config;
