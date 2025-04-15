require("dotenv").config();
const { REST, Routes } = require("discord.js");
const Kconfig = require("./config")

// Load environment variables
const token = Kconfig.bot.token;
const clientId = Kconfig.bot.id;
const guildId = Kconfig.bot.developerCommandsServerIds;

// Create the REST instance
const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
        console.log("🔍 Fetching existing slash commands...");
        // Fetch guild-specific slash commands
        const guildCommands = await rest.get(
            Routes.applicationGuildCommands(clientId, guildId)
        );

        if (guildCommands.length > 0) {
            console.log(`📋 Found ${guildCommands.length} guild commands. Deleting...`);
            // Loop through and delete each command
            for (const command of guildCommands) {
                console.log(`❌ Deleting guild command: ${command.name}`);
                await rest.delete(
                    Routes.applicationGuildCommand(clientId, guildId, command.id)
                );
            }
            console.log("✅ Successfully deleted all guild-specific commands!");
        } else {
            console.log("ℹ️ No guild-specific slash commands found to delete.");
        }

        // Fetch global slash commands
        const globalCommands = await rest.get(
            Routes.applicationCommands(clientId)
        );

        if (globalCommands.length > 0) {
            console.log(`📋 Found ${globalCommands.length} global commands. Deleting...`);
            // Loop through and delete each command
            for (const command of globalCommands) {
                console.log(`❌ Deleting global command: ${command.name}`);
                await rest.delete(
                    Routes.applicationCommand(clientId, command.id)
                );
            }
            console.log("✅ Successfully deleted all global commands!");
        } else {
            console.log("ℹ️ No global slash commands found to delete.");
        }

        console.log("🚀 All slash commands have been removed.");
    } catch (error) {
        console.error("❌ Error removing commands:", error);
    }
})();
