const { ThreadChannel } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class threadCreateEvent extends Event {
    constructor(client) {
        super('threadCreate', client);
    };

    /**
     * @param {Bot} client
     * @param {ThreadChannel} thread
     */

    async run(client, thread) {

        client.logEvent(this.name);
    };
};

module.exports = threadCreateEvent;