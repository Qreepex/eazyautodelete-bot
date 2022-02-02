const { Bot, Command } = require("@eazyautodelete/eazyautodelete-core");
const { CommandInteraction, MessageEmbed, Util } = require("discord.js");

class AutodeleteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "autodelete",
            description: "Shows useful information about the bot",

            example: "info",

            dirname: __dirname,

            usage: "info",

            aliases: ["setautodelete", "set-autodelete"],

            options: [
                {
                    type: 1,
                    name: "show",
                    description: "Shows the current config of autodelete system.",
                    options: [
                        {
                            type: 7,
                            name: "channel",
                            description: "The channel to show the config from. If empty will show all.",
                            required: false,
                            channel_types: [ 0, 5, 10, 11, 12 ]
                        }
                    ]
                },{
                    type: 1,
                    name: "set",
                    description: "Sets the new duration to delete messages after.",
                    options: [
                        {
                            type: 3,
                            name: "duration",
                            description: "The duration after which the message should be deleted.",
                            required: true
                        },{
                            type: 7,
                            name: "channel",
                            description: "The channel to show the config from. If empty will show all.",
                            required: false,
                            channel_types: [ 0, 5, 10, 11, 12 ]
                        }
                    ]
                }
            ],
        });
    };

    /**
     * The main function executed when ever the command is run.
     * @param {Bot} client
     * @param {CommandInteraction}  interaction
     */

    async run(client, interaction) {
        let command = interaction.options.data[0]?.type === "SUB_COMMAND" ? interaction.options.data[0]?.name : null;
        if(!command) return;

        let args = interaction.options.data[0]?.options;

        if(command === "show") {
            let channel = args?.[0]?.type === "CHANNEL" && args?.[0]?.channel ? args?.[0]?.channel : interaction.channel;

            let data = await client.database.getChannelSettings(channel.id);
            let filterString = ``;
            data.filters.forEach(filter => {
                filterString = filterString.length <= 1 ? client.filterToString(filter) : ", " + client.filterToString(filter)
            });
            
            let showChannelEmbed = new MessageEmbed()
                .setColor(this.assets.colors.default)
                .setFooter({ text: `${client.user.username} | Shard #${this.shard}`, iconURL: this.assets.images.logo.url })
                .setTitle(interaction.translate("showChannelTitle", Util.escapeMarkdown(channel.name)))
                .setDescription(interaction.translate("showChannelDesc", channel.id, Math.floor(data.registered/1000)))
                .addField(`${this.emojis.root} Guild`, `${Util.escapeMarkdown(channel.guild.name)} (\`${channel.guildId}\`)`, false)
                .addField(`:tools: Mode`, "``" + client.modeToString(data.mode) + "`` **([?](https://docs.eazyautodelete.xyz/modes))**", true)
                .addField(`:construction: Filter Behavior`, "``" + client.filterUsageToString(data.filterUsage) + "`` **([?](https://docs.eazyautodelete.xyz/filter-behavior))**", true)
                .addField(":mag_right: Filters", "```" + (filterString.length <= 1 ? "No Filters set up yet (Use: /filters)" : filterString) + "```", false)
                .addField(":eyes: Ignore", "```" + (data.ignore.length >= 1 ? "<@&"+data.ignore.join(">\n<@&")+">" : "No ignore roles set up yet (Use: /ignore)") + "```", false)
                .setTimestamp()
    
            return await this.reply(interaction, showChannelEmbed, true);
        };
    };
};

module.exports = AutodeleteCommand;