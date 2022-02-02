const { Bot, Command } = require("@eazyautodelete/eazyautodelete-core");
const { MessageEmbed, User, MessageActionRow, MessageButton } = require("discord.js");
const os = require("os");

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "info",
            description: "Shows useful information about the bot",

            example: "info",

            dirname: __dirname,

            usage: "info",

            aliases: ["information"],

            options: [],
        });
    };

    /**
     * The main function executed when ever the command is run.
     * @param {Bot} client
     */

    async run(client, interaction) {
        
        let memberCountRaw = await this.client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)).catch(e => {})
        let memberCount = memberCountRaw ? memberCountRaw.reduce((acc, memberCount) => acc + memberCount, 0) : "error:memCountShardsSpawning"

        let channelCountRaw = await this.client.shard.fetchClientValues("channels.cache.size")
        let channelCount = channelCountRaw ? channelCountRaw.reduce((acc, guildCount) => acc + guildCount, 0) : "error:chCountShardsSpawning"

        let infoEmbed = new MessageEmbed()
            .setColor(this.colors.default)
            .setTimestamp()
            .setTitle(this.client.user.username + " Information")
            .setDescription(interaction.translate("botinfoShort", client.user.username))
            .addField(this.emojis.calender + " Online since", "```" + client.parseDate(new Date(new Date().getTime()-client.uptime).getTime()).toString() + "```",true)
            .addField(this.emojis.uptimerobot + " Uptime", "```" + client.parseDuration(client.uptime).toString() + "```",true)
            .addField(this.emojis.ram + " RAM Usage", "```" + (((process.memoryUsage().heapUsed / 1024 / 1024) * 32).toFixed(2) + " / " + ((os.totalmem() / 1024 / 1024) * 4).toFixed(2)).toString() + " MB```")
            .addField(":tools: Servers", "```" + JSON.stringify(await client.clientValue("guilds.cache.size")) + " servers```",true)
            .addField(":busts_in_silhouette: Members", "```" + memberCount + " members```",true)
            .addField(this.emojis.channel + " Channels", "```" + channelCount + " channels```",true)
            .addField(this.emojis.discordjs + " Library", "```discord.js@" + require("../package.json").dependencies["discord.js"] + "```")
            .addField(":page_facing_up: Bot Version", "```v" + require("../package.json").version + "```", true)
            .addField(this.emojis.nodeJS + " NodeJS Version", "```" + process.version + "```", true)
            .addField(this.emojis.statusOnline + " WS Ping", "```" + client.ws.ping + "ms```", true)
            .addField(":book: Documentation", this.urls.docs, true)
            .addField(":link: Invite", this.urls.invite, true)
            .addField(":globe_with_meridians: Website", this.urls.website, true)
            .setFooter({ text: client.user.username + " | Shard #" + this.shard, iconURL: client.user.avatarURL() });

        let infoButtons = new MessageActionRow()
            .addComponents([
                new MessageButton() 
                    .setURL(this.urls.discordInvite)
                    .setLabel("Invite")
                    .setEmoji("🔗")
                    .setDisabled(false)
                    .setStyle("LINK"),

                new MessageButton()
                    .setURL(this.urls.website)
                    .setLabel("Website")
                    .setEmoji("🌐")
                    .setDisabled(false)
                    .setStyle("LINK"),

                new MessageButton()
                    .setURL(this.urls.statuspage)
                    .setLabel("Status Page")
                    .setEmoji("📣")
                    .setDisabled(false)
                    .setStyle("LINK"),

                new MessageButton()
                    .setURL(this.urls.docs)
                    .setLabel("Documentation")
                    .setEmoji("📖")
                    .setDisabled(false)
                    .setStyle("LINK")
            ])

        return await this.reply(interaction, infoEmbed, true, infoButtons)
    };
};

/** old links
 * \n\n**[Documentation]({url.docs}) | [Invite]({url.friendlyInvite}) | [Status Page]({url.statuspage})**"
                .replace("{url.docs}", this.urls.docs)
                .replace("{url.friendlyInvite}", this.urls.friendlyInvite)
                .replace("{url.statuspage}", this.urls.statuspage)
 */