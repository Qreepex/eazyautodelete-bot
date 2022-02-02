const { Role } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class roleCreateEvent extends Event {
    constructor(client) {
        super('roleCreate', client);
    };

    /**
     * @param {Bot} client
     * @param {Role} role
     */

    async run(client, role) {

        client.logEvent(this.name);
    };
};

module.exports = roleCreateEvent;