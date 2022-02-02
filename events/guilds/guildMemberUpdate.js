const { GuildMember } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class guildMemberUpdateEvent extends Event {
    constructor(client) {
        super('guildMemberUpdate', client);
    };

    /**
     * @param {Bot} client
     * @param {GuildMember} oldMember
     * @param {GuildMember} newMember
     */
 
    async run(client, oldMember, newMember) {
        client.logEvent(this.name);
    };
};

module.exports = guildMemberUpdateEvent;