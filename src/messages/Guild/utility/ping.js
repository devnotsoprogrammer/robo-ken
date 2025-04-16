module.exports = {
    name: "cmd-name",
    description: "cmd description.",
    aliases: ['aliases'],
    botPermissions: ['SendMessages'],
    userPermissions: ['ManageMessages'],
    adminOnly: false,
    ownerOnly: false,
    devSev: false,
    devOnly: false,
    SVOnly: false,
    cooldown: 10,
    run: async (client, message, args) => {

        return message.reply("Hello, World!");

    },
}; 