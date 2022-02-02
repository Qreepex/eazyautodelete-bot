const { TextChannel } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class channelPinsUpdateEvent extends Event {
    constructor(client) {
        super('channelPinsUpdate', client);
    };

    /**
     * @param {Bot} client
     * @param {TextChannel} channel
     * @param {Date} time
     */

    async run(client, channel, time) {

        client.logEvent(this.name);
    };
};

module.exports = channelPinsUpdateEvent;