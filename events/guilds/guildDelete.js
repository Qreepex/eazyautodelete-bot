const { Guild } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class guildDeleteEvent extends Event {
    constructor(client) {
        super('guildDelete', client);
    };

    /**
     * @param {Bot} client
     * @param {Guild} guild
     */
 
    async run(client, guild) {
        await client.database.deleteGuildSettings(guild.id);

        client.logEvent(this.name);
    };
};

module.exports = guildDeleteEvent;