const { ShardingManager } = require('discord.js');
require('dotenv').config();
const config = require('./config');

const manager = new ShardingManager('./core/main.js', {
    token: config.bot.token,
    totalShards: 'auto',

    shardArgs: [
        '--color',
        '--trace-warnings',
        '--unhandled-rejections=strict',
        '--max-old-space-size=4096',
    ],
    shardStatus: (shardID, status) => {
        console.log(`[SHARD] Shard ${shardID} is ${status}`);
    },

});

console.log('[MASTER] Spawning shards...');
manager.spawn({ delay: 15000 })
    .then(() => console.log('[MASTER] All shards successfully spawned.'))
    .catch(err => console.error('[MASTER] Failed to spawn shards:', err));
