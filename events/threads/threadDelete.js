const { ThreadChannel } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class threadDeleteEvent extends Event {
    constructor(client) {
        super('threadDelete', client);
    };

    /**
     * @param {Bot} client
     * @param {ThreadChannel} thread
     */

    async run(client, thread) {
        await client.database.deleteChannelSettings(thread.id);

        client.logEvent(this.name);
    };
};

module.exports = threadDeleteEvent;