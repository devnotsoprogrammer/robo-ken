const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const config = require('../config');
const Subject = require('../core/client');

// Creating a new instance of Subject if necessary for other parts of the project, else pass the client instance when instantiating Utils.
//! const client = new Subject();

class Utils {
    constructor(client) {
        this.client = client;
    }

    /**
     * Sends an embed message to a specified channel by its ID.
     * @param {string} channelId - The Discord channel ID.
     * @param {EmbedBuilder} embed - The embed to send.
     * @returns {Promise<Message|null>} The sent message or null if the channel is not found.
     */
    async sendEmbed(channelId, embed) {
        const channel = this.client.channels.cache.get(channelId);
        if (channel) {
            return await channel.send({ embeds: [embed] });
        } else {
            console.error(`Channel with ID ${channelId} not found!`);
            return null;
        }
    }

    /**
 * Creates a new Embed with common options.
 * @param {Object} options - Options for embed creation.
 * @param {string} [options.title=""] - The embed title.
 * @param {string} [options.description=""] - The embed description.
 * @param {string} [options.color] - The embed color (defaults to "#37373d").
 * @param {Array<Object>} [options.fields=[]] - An array of field objects: { name, value, inline? }.
 * @param {string} [options.footer] - The footer text.
 * @param {string} [options.footerIcon] - The footer image/icon URL.
 * @param {string} [options.image] - The URL for the main embed image.
 * @param {string} [options.thumbnail] - The URL for the embed's thumbnail.
 * @param {boolean} [options.timestamp=true] - Whether to add a timestamp.
 * @returns {EmbedBuilder} The created embed.
 */
    createEmbed({
        title = "",
        description = "",
        color,
        fields = [],
        footer,
        footerIcon,
        image,
        thumbnail,
        timestamp = true
    } = {}) {
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color || "#37373d");

        if (fields.length > 0) embed.addFields(...fields);

        if (footer || footerIcon) {
            embed.setFooter({ text: footer || "", iconURL: footerIcon });
        }

        if (timestamp) embed.setTimestamp();

        if (image) embed.setImage(image);

        if (thumbnail) embed.setThumbnail(thumbnail);

        return embed;
    }


    /**
     * Creates a new Button with the provided options.
     * @param {Object} options - Options for button creation.
     * @param {string} options.customId - The custom identifier for the button.
     * @param {string} options.label - The label displayed on the button.
     * @param {ButtonBuilder["data"]["style"]} options.style - The style of the button (e.g., 'PRIMARY', 'SUCCESS').
     * @param {string} [options.emoji] - An optional emoji to display on the button.
     * @returns {ButtonBuilder} The created button.
     */
    createButton({ customId, label, style, emoji }) {
        return new ButtonBuilder()
            .setCustomId(customId)
            .setLabel(label)
            .setStyle(style)
            .setEmoji(emoji);
    }

    /**
     * Creates an Action Row with the provided components (e.g., buttons).
     * @param {Array} components - An array of components to add.
     * @returns {ActionRowBuilder} The created action row.
     */
    createActionRow(components = []) {
        return new ActionRowBuilder().addComponents(components);
    }

    /**
     * Returns a promise that resolves after a given delay.
     * @param {number} ms - The delay in milliseconds.
     * @returns {Promise<void>} A promise that resolves after the delay.
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Logs an error by sending an embed to the designated error logs channel.
     * @param {Error} error - The error to log.
     */
    async logError(error) {
        try {
            const logChannelId = config.logging.errorLogs;
            const channel = this.client.channels.cache.get(logChannelId);
            if (channel) {
                const embed = new EmbedBuilder()
                    .setTitle("Error Log")
                    .setDescription(`\`\`\`${error.stack}\`\`\``)
                    .setColor(this.getDefaultColor())
                    .setTimestamp();
                await channel.send({ embeds: [embed] });
            } else {
                console.error("Error logging channel not found");
            }
        } catch (err) {
            console.error("Failed to log error:", err, error);
        }
    }

    /**
     * Parses a user mention string and returns the corresponding user.
     * @param {string} mention - The mention string (e.g., "<@!1234567890>").
     * @returns {User|null} The user from the client cache or null if not found.
     */
    getUserFromMention(mention) {
        if (!mention) return null;
        if (mention.startsWith("<@") && mention.endsWith(">")) {
            mention = mention.slice(2, -1);
            if (mention.startsWith("!")) {
                mention = mention.slice(1);
            }
            return this.client.users.cache.get(mention);
        }
        return null;
    }

    /**
     * Converts seconds into a human-readable time format (days, hours, minutes, seconds).
     * @param {number} totalSeconds - The total seconds to parse.
     * @returns {string} Formatted time string.
     */
    parseTime(totalSeconds) {
        totalSeconds = Number(totalSeconds);
        const days = Math.floor(totalSeconds / (3600 * 24));
        totalSeconds %= 3600 * 24;
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    /**
     * Returns the default embed color.
     * @returns {string} The default color hex code.
     */
    getDefaultColor() {
        return "#ED4245"; // Default fallback color (Error Red)
    }

    // --- NEW FUNCTIONS ---

    /**
     * Capitalizes the first letter of a string.
     * @param {string} text - The text to capitalize.
     * @returns {string} The capitalized text.
     */
    capitalize(text) {
        if (!text || typeof text !== "string") return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    /**
     * Returns a random element from an array.
     * @param {Array} array - The array to pick from.
     * @returns {*} A random item from the array.
     */
    randomItem(array) {
        if (!Array.isArray(array) || array.length === 0) return null;
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    }

    /**
     * Validates if a given string is a proper URL.
     * @param {string} url - The string to validate.
     * @returns {boolean} True if valid URL, else false.
     */
    validateURL(url) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    }

    /**
     * Fetches a guild member from a guild.
     * @param {string} guildId - The ID of the guild.
     * @param {string} userId - The user ID of the member.
     * @returns {Promise<GuildMember|null>} The guild member or null if not found.
     */
    async getMemberFromGuild(guildId, userId) {
        const guild = this.client.guilds.cache.get(guildId);
        if (!guild) return null;
        try {
            const member = await guild.members.fetch(userId);
            return member;
        } catch (err) {
            console.error(`Failed to fetch member ${userId} from guild ${guildId}:`, err);
            return null;
        }
    }

    /**
     * Formats a date or timestamp into a human-readable string.
     * @param {Date|number} dateInput - A Date object or timestamp.
     * @param {Object} [options] - Intl.DateTimeFormat options.
     * @returns {string} The formatted date string.
     */
    formatDate(dateInput, options = {}) {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        return date.toLocaleString(undefined, options);
    }

    /**
     * Formats a number with commas as thousand separators.
     * @param {number} number - The number to format.
     * @returns {string} The formatted number string.
     */
    formatNumber(number) {
        return number.toLocaleString();
    }

    /**
     * Creates an ASCII progress bar string.
     * @param {number} current - The current progress value.
     * @param {number} total - The total required for completion.
     * @param {number} [length=20] - The total length of the progress bar.
     * @returns {string} The generated progress bar.
     */
    createProgressBar(current, total, length = 20) {
        const progress = Math.round((current / total) * length);
        const bar = "█".repeat(progress) + "░".repeat(length - progress);
        return bar;
    }

    /**
     * Splits a long message into chunks that respect a maximum character limit.
     * @param {string} message - The message to split.
     * @param {number} [maxLength=2000] - Maximum allowed length per chunk.
     * @returns {Array<string>} An array of message chunks.
     */
    splitMessage(message, maxLength = 2000) {
        if (message.length <= maxLength) return [message];

        const chunks = [];
        let start = 0;
        while (start < message.length) {
            chunks.push(message.slice(start, start + maxLength));
            start += maxLength;
        }
        return chunks;
    }

    /**
     * Retries a promise-based function a specified number of times with delays.
     * @param {() => Promise<any>} fn - The function to retry.
     * @param {number} retries - Number of retries.
     * @param {number} delayMs - Delay between retries in milliseconds.
     * @returns {Promise<any>} The promise result.
     */
    async retry(fn, retries = 3, delayMs = 1000) {
        while (retries > 0) {
            try {
                return await fn();
            } catch (err) {
                retries--;
                if (retries === 0) throw err;
                await this.delay(delayMs);
            }
        }
    }

    /**
     * Fetches a user from a Discord client.
     * @param {Client} client - The Discord client.
     * @param {Message} message - The Discord message containing the mention.
     * @param {string} mention - The mention string (e.g., "<@!1234567890>").
     * @returns {Promise<User|null>} The fetched user or null if not found.
     * */

    async fetchUser(client, message, mention) {
        if (!mention) return null;

        if (mention.match(/^<@!?(\d+)>$/)) {
            const id = mention.match(/^<@!?(\d+)>$/)[1];
            return await client.users.fetch(id).catch(() => null);
        }

        if (mention.match(/^\d+$/)) {
            return await client.users.fetch(mention).catch(() => null);
        }

        return null;
    }

    /**
  * Checks the role hierarchy for an action (e.g., kick or ban) and returns a result object.
  *
  * The checks are performed in this order:
  * 1. If the executor is the guild owner, the method returns success immediately.
  * 2. Otherwise, it checks that the executor’s highest role is above the target's highest role.
  * 3. Then, it checks that the bot’s highest role is above the target's highest role.
  *
  * If any check fails, it returns an object with success: false and an embed outlining:
  * - The viewer's (executor's) highest role and position.
  * - The target's highest role and position.
  * - In the case of the bot, the bot’s role details.
  *
  * @param {GuildMember} executor - The member executing the command.
  * @param {GuildMember} target - The target member on which the command acts.
  * @param {GuildMember} botMember - The bot's member instance in the guild.
  * @returns {{ success: boolean, embed?: EmbedBuilder }} The result object with a possible error embed.
  */
    checkRoleHierarchy(executor, target, botMember) {
        // If the executor is the guild owner, allow the action.
        if (executor.id === executor.guild.ownerId) {
            return { success: true };
        }

        // Check if the executor's highest role is lower than or equal to the target's highest role.
        if (executor.roles.highest.comparePositionTo(target.roles.highest) <= 0) {
            const embed = new EmbedBuilder()
                .setTitle("Role Hierarchy Check Failed")
                .setDescription(
                    `You cannot perform this action because your highest role is lower than or equal to the target's highest role.` +
                    `\n\n**Your Highest Role:** \`${executor.roles.highest.name}\` (Position: ${executor.roles.highest.position})` +
                    `\n**Target's Highest Role:** \`${target.roles.highest.name}\` (Position: ${target.roles.highest.position})`
                )
                .setColor("#ED4245") // Error Red
                .setTimestamp();
            return { success: false, embed };
        }

        // Check if the bot's highest role is lower than or equal to the target's highest role.
        if (botMember.roles.highest.comparePositionTo(target.roles.highest) <= 0) {
            const embed = new EmbedBuilder()
                .setTitle("Role Hierarchy Check Failed")
                .setDescription(
                    `I cannot perform this action because my highest role is lower than or equal to the target's highest role.` +
                    `\n\n**My Highest Role:** \`${botMember.roles.highest.name}\` (Position: ${botMember.roles.highest.position})` +
                    `\n**Target's Highest Role:** \`${target.roles.highest.name}\` (Position: ${target.roles.highest.position})`
                )
                .setColor("#ED4245") // Error Red
                .setTimestamp();
            return { success: false, embed };
        }

        // All role checks passed.
        return { success: true };
    }

}

module.exports = Utils;
