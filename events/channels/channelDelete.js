const { TextChannel } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class channelDeleteEvent extends Event {
    constructor(client) {
        super('channelDelete', client);
    };

    /**
     * @param {Bot} client
     * @param {TextChannel} channel
     */

    async run(client, channel) {
        await client.database.deleteChannelSettings(channel.id);

        client.logEvent(this.name);
    };
};

module.exports = channelDeleteEvent;