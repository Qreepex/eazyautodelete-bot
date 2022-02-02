const { Presence } = require("discord.js");
const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class presenceUpdateEvent extends Event {
    constructor(client) {
        super('presenceUpdate', client);
    };

    /**
     * @param {Bot} client
     * @param {?Presence} oldPresence
     * @param {Presence} newPresence
     */

    async run(client, oldPresence, newPresence) {
        client.logEvent(this.name);
    };
};

module.exports = presenceUpdateEvent;