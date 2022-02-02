const { writeFileSync } = require("fs");
const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");
const { User } = require("discord.js")
const hostname = require("os").hostname();

class ReadyEvent extends Event {
    constructor(client) {
        super("ready", client);
    };

    /**
     * @param {Bot} client 
     */

    async run(client) {
        client.logEvent(this.name);

        client.user.setPresence({
            activities: [{
                name: "EazyAutodelete | "+client.config.sharding[hostname].id+"-"+this.getShard(client),
            }],
            afk: false,
            status: "online",
            shardId: this.getShard(client),
        });

        await client.wait(1000);

        client.ready = true;

        setInterval(() => {
            writeFileSync("./data/commandsRan.json", JSON.stringify(client.stats.commandsRan));
        }, 5000)

        //client.AutodeleteHandler.start()
    };
};

module.exports = ReadyEvent;