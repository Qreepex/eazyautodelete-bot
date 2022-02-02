const { Event, Bot } = require("@eazyautodelete/eazyautodelete-core");

class guildBanRemoveEvent extends Event {
    constructor(client) {
        super('guildBanRemove', client);
    };

    /**
     * @param {Bot} client
     */

    async run(client, ban) {
        client.logEvent(this.name);
    };
};

module.exports = guildBanRemoveEvent;