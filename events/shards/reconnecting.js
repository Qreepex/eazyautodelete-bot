const { ShardEvent, Bot } = require("@eazyautodelete/eazyautodelete-core");

class shardReconnectEvent extends ShardEvent {
    constructor(client) {
        super('shardReconnecting', client);
    };

    /**
     * @param {Number} shardId 
     * @param {Bot} client
     */

    async run(client, shardId) {
        client.Logger.info(`⚡ Shard-${shardId} is reconnecting`, "SHRD");

        client.sendShardWebhook(`${this.emojis.status.ONLINE} | **Shard** \`#${shardId}\` is reconnecting!`);

        client.logEvent(this.name);
    }
};

module.exports = shardReconnectEvent;