const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class guildBanAddEvent extends Event {
    constructor(client) {
        super('guildBanAdd', client);
    };

    /**
     * @param {Bot} client
     */

    async run(client, ban) {
        client.logEvent(this.name);
    };
};

module.exports = guildBanAddEvent;