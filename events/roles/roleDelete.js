const { Role } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class roleDeleteEvent extends Event {
    constructor(client) {
        super('roleDelete', client);
    };

    /**
     * @param {Bot} client
     * @param {Role} role
     */

    async run(client, role) {

        client.logEvent(this.name);
    };
};

module.exports = roleDeleteEvent;