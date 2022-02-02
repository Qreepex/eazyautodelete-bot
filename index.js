if(!process.argv.includes("--sharded")) {
    console.error("❌ You have to start EazyAutodelete with the sharder.js file!");
    process.exit(0);
};

const { Bot } = require("@eazyautodelete/eazyautodelete-core");
const config = require("./config/config.js");
const commandDeployer = require("./commandDeployer");

const client = new Bot(config);

const initialize = async () => {
    await client.registerCommands(`${require.main.path}/commands`, client);
    client.Logger.info(`💬 Shard-${client.shard.ids} registered ${client.commands.size} commands`, "CMDS");

    await client.registerEvents(`${require.main.path}/events`, client);
    client.Logger.info(`🔔 Shard-${client.shard.ids} registered ${client.activeEvents.length} events`, "EVNT");

    await client.database.connect();

    await client.login(config.token);

   // commandDeployer(client.commands, client.application.id)

    if(client.shard.ids.toString() != "0") return console.log("##########################################");
};

initialize();

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);