const { ShardEvent, Bot } = require("@eazyautodelete/eazyautodelete-core");

class shardReadyEvent extends ShardEvent {
    constructor(client) {
        super('shardReady', client);
    };

    /**
     * @param {Number} shardId 
     * @param {Bot} client
     */

    async run(client, shardId) {
        client.Logger.info(`⚡ Shard-${shardId} is ready`, "SHRD");
        client.Logger.info("-", "BLANK")

        client.sendShardWebhook(`${this.emojis.status.ONLINE} | **Shard** \`#${shardId}\` is ready!`);

        client.logEvent(this.name);
    }
};

module.exports = shardReadyEvent;