const { MessageReaction, Message, Collection } = require("discord.js");
const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");

class messageReactionRemoveAllEvent extends Event {
    constructor(client) {
        super("messageReactionRemoveAll", client);
    };

    /**
     * @param {Bot} client 
     * @param {Message} message
     * @param {Collection<String,MessageReaction>} reactions
     */

    async run(client, message, reactions) {

        client.logEvent(this.name);
    };
};

module.exports = messageReactionRemoveAllEvent;