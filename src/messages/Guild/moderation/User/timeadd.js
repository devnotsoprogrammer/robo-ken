const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "timeadd",
    aliases: ["addt", "addtime", "addmute", "addtimeout"],
    description: "Add time to a user's mute/timeout.",
    category: ["moderation"],
    botPermissions: ['ModerateMembers'],
    userPermissions: ['ModerateMembers'],
    adminOnly: false,
    ownerOnly: false,
    devSev: false,
    devOnly: false,
    SVOnly: true,
    cooldown: 10,
    run: async (client, message, args) => {

        try {
            const user = await client.utils.fetchUser(client, message, args[0]);
            if (!user) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `${client.emote.utility.cross} | User not found! Recheck User ID.`
                            )
                            .setColor(client.color.DEFAULT),
                    ],
                });
            }

            const additionalDuration = args[1] ? ms(args[1]) : ms("1m");

            const targetMember = await message.guild.members
                .fetch(user.id)
                .catch(() => null);

            if (!targetMember) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `${client.emote.utility.cross} | Unable to fetch the member!`
                            )
                            .setColor(client.color.DEFAULT),
                    ],
                });
            }

            if (!targetMember.communicationDisabledUntilTimestamp) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `${client.emote.utility.cross} | This user is not currently muted! To mute them, use: \`mute <user> <duration>\`.`
                            )
                            .setColor(client.color.DEFAULT),
                    ],
                });
            }

            // Calculate new mute duration
            const newDuration = new Date(targetMember.communicationDisabledUntilTimestamp).getTime() + additionalDuration;

            await targetMember.timeout(newDuration, `Additional time added by ${message.author.tag}`);

            const successEmbed = new EmbedBuilder()
                .setDescription(
                    `${client.emote.utility.success} | Successfully added time to ${user.tag
                    }'s mute. New duration: ${ms(newDuration - Date.now(), { long: true })}.`
                )
                .setColor("#000000");

            await message.reply({ embeds: [successEmbed] });
        } catch (error) {
            console.error("Error executing timeadd command:", error);
            await message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            `${client.emote.utility.cross} | An error occurred while executing the command.`
                        )
                        .setColor(client.color.DEFAULT),
                ],
            });
        }
    },
};
