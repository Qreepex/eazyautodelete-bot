const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const now = performance.now;

module.exports = class extends Event {
    constructor(client) {
        super("interactionCreate", client);
    };

    /**
     * The main function executed when ever the event is triggered.
     * @param {Bot} client 
     * @param {CommandInteraction} interaction
     */

    async run(client, interaction) {
        if(!client.ready) return;

        client.logEvent(this.name);

        if(interaction.isCommand()) {

            const startAt = now();

            if(interaction.channel.type === "DM" || !interaction.guild) {
                let noDMsButton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setURL("https://eazyautodelete.xyz/invite/")
                            .setStyle("LINK")
                            .setLabel("Add EazyAutodelete")
                    )

                let noDMsEmbed = new MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Not supported!")
                    .setDescription("Commands via dm are not supported, you need to add EazyAutodelete to a server!")

                return interaction.reply({ embeds: [ noDMsEmbed ], components: [ noDMsButton ] }).catch(client.Logger.error);
            };

            const [
                guildSettings,
                userSettings
            ] = await Promise.all([
                client.database.getGuildSettings(interaction.guildId),
                client.database.getUserSettings(interaction.user.id)
            ]);
        
            interaction.guild.settings = guildSettings;
            interaction.userSettings = userSettings;
            interaction.translate = function(e, ...t) {
                let n = client.translate({ phrase: e, locale: interaction.userSettings.language || "en"});
                for(let i = 0; n.includes("%s"); i++) n=n.replace("%s", t[i]);
                return n
            };

            let commandName = interaction.commandName;
            const command = this.client.commands.get(commandName);
            if(!command) return this.client.Logger.error(`❌ Command ${commandName} not found!`, "ERRO");

            const guild = this.client.guilds.cache.get(interaction.guildId);
            const member = interaction.member || guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id).catch(() => {});
            interaction.member = member;

            if(client.disabledCommands.has(commandName)) {
                let disabledReason = disabledCommands[commandName];
                let commandDisabledEmbed = new MessageEmbed()
                    .setColor(this.colors.error)
                    .setTimestamp().setFooter(`Questions? => /help`, client.user.avatarURL({ dynamic: true }))
                    .setDescription(interaction.translate("commandDisabled", disabledReason));

                return await interaction.reply({ embeds: [ commandDisabledEmbed ], ephemeral: true });
            }

            // user perms check
            // channel perms check

            



            command.run(client, interaction);
        };

        if(interaction.type === "APPLICATION_COMMAND_AUTOCOMPLETE") {
            let commandName = interaction.commandName;
            let command = client.commands.get(commandName);
            let user = interaction.user;
            if(!command) return client.Logger.warn(`Executed "${commandName}" - [${user.tag} | ${user.id}] - NO COMMAND CLASS IN LOADED COMMANDS FOUND`);

            let autocompleteQuery = interaction.options.data[0].value;
            let queryResults = command.autocompleteHandler(autocompleteQuery);

            return await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 8,
                    data: {
                        choices: queryResults,
                    },
                },
            });
        }

        if(interaction.isSelectMenu()) {
            let created = interaction.message?.createdTimestamp
            let dur = (new Date().getTime() - created)/1000
            if(dur >= 300) return interaction.deferUpdate();

            let customId = interaction.customId;
            if(customId.startsWith("cmd_")) {
                let commandName = customId.split("_")?.[1];

                /**
                 * @type {BaseCommand}
                 */
                let command = client.commands.get(commandName)
                if(!command) return;

                return command.selectMenuHandler(interaction)
            }
        }
    };
};

/**
 * Returns a translated text by the keys.
 * @param {String} key 
 * @param {String} args 
 * @returns {String}
 */
async function translate(key, client, interaction) {
    let userSettings = await client.Data.users.get(interaction.user.id)
    return client.translate(key, args, userSettings.language)
};