const { ThreadChannel } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class threadUpdateEvent extends Event {
    constructor(client) {
        super('threadUpdate', client);
    };

    /**
     * @param {Bot} client
     * @param {ThreadChannel} oldThread
     * @param {ThreadChannel} newThread
     */

    async run(client, oldThread, newThread) {

        client.logEvent(this.name);
    };
};

module.exports = threadUpdateEvent;