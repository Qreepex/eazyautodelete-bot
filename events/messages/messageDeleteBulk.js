const { Message, Collection } = require("discord.js");
const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");

class messageDeleteBulkEvent extends Event {
    constructor(client) {
        super("messageDeleteBulk", client);
    };

    /**
     * @param {Bot} client 
     * @param {Collection<Message>} messages
     */

    async run(client, messages) {

        client.logEvent(this.name);
    };
};

module.exports = messageDeleteBulkEvent;