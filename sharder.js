(async () => {
    const { ShardingManager, User, Member } = require('discord.js');
    const { mkdir } = require('fs');
    const host = require("os")?.hostname();
    const config = require("./config/sharding.js")?.[host];
    const Logger = new (require("@eazyautodelete/eazyautodelete-core")?.Logger);

    const shardingManager = new ShardingManager('./index.js', { 
        token: config.token,
        shardList: config.shardList,
        totalShards: config.shardCount,
        shardArgs: [ ...process.argv, ...[ '--sharded' ] ]
    });

    Logger.info("🚀 EazyAutodelete has been started!", "SHRD");
    Logger.info("-", "BLANK");

    mkdir("./log/shards", () => {})
    mkdir("./log/shards/events", () => {})

    shardingManager.spawn();
})();