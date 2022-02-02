const { MessageReaction, User } = require("discord.js");
const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");

class messageReactionRemoveEmojiEvent extends Event {
    constructor(client) {
        super("messageReactionRemoveEmoji", client);
    };

    /**
     * @param {Bot} client 
     * @param {MessageReaction} reaction
     */

    async run(client, reaction) {

        client.logEvent(this.name);
    };
};

module.exports = messageReactionRemoveEmojiEvent;