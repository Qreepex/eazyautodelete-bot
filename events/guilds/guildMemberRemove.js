const { GuildMember } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class guildMemberRemoveEvent extends Event {
    constructor(client) {
        super('guildMemberRemove', client);
    };

    /**
     * @param {Bot} client
     * @param {GuildMember} member
     */
 
    async run(client, member) {
        client.logEvent(this.name);
    };
};

module.exports = guildMemberRemoveEvent;