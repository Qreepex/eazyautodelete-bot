const { Guild } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class guildCreateEvent extends Event {
    constructor(client) {
        super('guildCreate', client);
    };

    /**
     * @param {Bot} client
     * @param {Guild} guild
     */

    async run(client, guild) {
        await client.database.createGuildSettings(guild.id);

        client.logEvent(this.name);
    };
};

module.exports = guildCreateEvent;