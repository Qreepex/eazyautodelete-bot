const { GuildMember } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class guildMemberAddEvent extends Event {
    constructor(client) {
        super('guildMemberAdd', client);
    };

    /**
     * @param {Bot} client
     * @param {GuildMember} member
     */
 
    async run(client, member) {
        client.logEvent(this.name);
    };
};

module.exports = guildMemberAddEvent;