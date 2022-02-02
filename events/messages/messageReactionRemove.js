const { MessageReaction, User } = require("discord.js");
const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");

class messageReactionRemoveEvent extends Event {
    constructor(client) {
        super("messageReactionRemove", client);
    };

    /**
     * @param {Bot} client 
     * @param {MessageReaction} reaction
     * @param {User} user
     */

    async run(client, reaction, user) {

        client.logEvent(this.name);
    };
};

module.exports = messageReactionRemoveEvent;