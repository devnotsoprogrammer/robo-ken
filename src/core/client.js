const { GatewayIntentBits, ShardingManager, ActivityFlags, ActivityType, Collection } = require('discord.js');
const { Client } = require('discord.js');
const config = require('../config');
const Emoji = require('../structure/emoji')
const Color = require('../structure/color');
const Utils = require('../utils/utils');



class Subject extends Client {
    constructor(options) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.AutoModerationConfiguration,
                GatewayIntentBits.AutoModerationExecution,
            ],
            partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],

        });
        this.config = config;
        this.emote = Emoji(this);
        this.colors = Color(this);
        this.utils = Utils(this);
    }
}

module.exports = Subject;
