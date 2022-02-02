const { Message } = require("discord.js");
const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");

class messageUpdateEvent extends Event {
    constructor(client) {
        super("messageUpdate", client);
    };

    /**
     * @param {Bot} client 
     * @param {Message} oldMessage
     * @param {Message} newMessage
     */

    async run(client, oldMessage, newMessage) {

        client.logEvent(this.name);
    };
};

module.exports = messageUpdateEvent;