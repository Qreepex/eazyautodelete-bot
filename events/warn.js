const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");

class WarnEvent extends Event {
    constructor(client) {
        super("warn", client);
    };

    /**
     * @param {Bot} client 
     */

    async run(client, message) {

        client.logEvent(this.name);
        return client.Logger.warn(message, "WARN");
    };
};

module.exports = WarnEvent;