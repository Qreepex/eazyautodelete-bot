const { Message } = require("discord.js");
const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");

class messageDeleteEvent extends Event {
    constructor(client) {
        super("messageDelete", client);
    };

    /**
     * @param {Bot} client 
     * @param {Message} message
     */

    async run(client, message) {

        client.logEvent(this.name);
    };
};

module.exports = messageDeleteEvent;