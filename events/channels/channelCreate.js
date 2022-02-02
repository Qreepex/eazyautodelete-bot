const { TextChannel } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class channelCreateEvent extends Event {
    constructor(client) {
        super('channelCreate', client);
    };

    /**
     * @param {Bot} client
     * @param {TextChannel} channel
     */

    async run(client, channel) {

        client.logEvent(this.name);
    };
};

module.exports = channelCreateEvent;