const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Describe your command here.'),
    devOnly: true,
    async execute(interaction, client) {
        await interaction.reply({ content: 'Test command executed successfully.' });
    }
};