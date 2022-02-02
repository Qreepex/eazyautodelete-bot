const { ShardEvent, Bot } = require("@eazyautodelete/eazyautodelete-core");

class shardDisconnectEvent extends ShardEvent {
    constructor(client) {
        super('shardDisconnect', client);
    };

    /**
     * @param {Number} shardId 
     * @param {Bot} client
     */

    async run(client, shardId) {
        client.Logger.warn(`❌ Shard-${shardId} disconnected`, "SHRD");

        client.sendShardWebhook(`${this.emojis.status.DND} | **Shard** \`#${shardId}\` disconnected! ||<@&552530299423293441>`);

        client.logEvent(this.name);
    }
};

module.exports = shardDisconnectEvent;