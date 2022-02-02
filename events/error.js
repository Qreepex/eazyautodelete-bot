const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");

class ErrorEvent extends Event {
    constructor(client) {
        super("error", client);
    };

    /**
     * @param {Bot} client 
     */

    async run(client, message) {
        return client.Logger.error(message, "ERRO");

        client.logEvent(this.name);
    };
};

module.exports = ErrorEvent;