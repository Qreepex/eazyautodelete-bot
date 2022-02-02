const { ShardEvent, Bot } = require("@eazyautodelete/eazyautodelete-core");

class shardResumeEvent extends ShardEvent {
    constructor(client) {
        super('shardResume', client);
    };

    /**
     * @param {Number} shardId 
     * @param {Bot} client
     */

    async run(client, shardId) {
        // client.Logger.info(`⚡ Shard-${shardId} is resuming`, "SHRD");

        client.sendShardWebhook(`${this.emojis.status.IDLE} | **Shard** \`#${shardId}\` is resuming!`);

        client.logEvent(this.name);
    }
};

module.exports = shardResumeEvent;