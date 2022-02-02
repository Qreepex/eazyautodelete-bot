const { Role } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class roleUpdateEvent extends Event {
    constructor(client) {
        super('roleUpdate', client);
    };

    /**
     * @param {Bot} client
     * @param {Role} oldRole
     * @param {Role} newRole
     */

    async run(client, oldRole, newRole) {

        client.logEvent(this.name);
    };
};

module.exports = roleUpdateEvent;