const Collection = require("@discordjs/collection")

/**
 * @param {Collection} commands 
 * @param {string} applicationId 
 */
module.exports = async function(commands, applicationId) {

    let commandsArray = []
    commands.forEach(cmd => {
        commandsArray.push(cmd.data)
    })

    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    const config = require("./config/config")

    const rest = new REST({ version: '9' }).setToken(config.token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(applicationId),
                { body: commandsArray },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        };
    })();
};