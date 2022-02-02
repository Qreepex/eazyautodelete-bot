const { Message, Permissions, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { Bot, Event } = require("@eazyautodelete/eazyautodelete-core");
const now = performance.now;

class MessageCreateEvent extends Event {
    constructor(client) {
        super("messageCreate", client);
    };

    /**
     * @param {Bot} client 
     * @param {Message} message
     */

    async run(client, message) {
        if(!client.ready) return;

        client.logEvent(this.name);

        const startAt = now();

        if(!message?.guild || message?.channel?.type === "DM") {
            if(message.author.bot) return;

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

            return message?.reply({ embeds: [ noDMsEmbed ], components: [ noDMsButton ] }).catch(client.Logger.error);
        };

        const [
            channelSettings,
            userSettings
        ] = await Promise.all([
            client.database.getChannelSettings(message.channelId, message.guildId),
            client.database.getUserSettings(message?.author.id)
        ]);

        console.log(channelSettings)

        message.author.settings = userSettings;
        message.channel.settings = channelSettings;
        message.translate = function(e, ...t) {
            let n = client.translate({ phrase: e, locale: message.author.settings.language || "en" });
            for(let i = 0; n.includes("%s"); i++) n=n.replace("%s", t[i]);
            return n;
        };

        if(!message.channel.settings?.mode || message.channel.settings.mode === 0) return;

        if(!message.channel.permissionsFor(client.user.id).has(Permissions.FLAGS.MANAGE_MESSAGES)) return;

        let ignore = false;
        if(!message.member?.roles?.cache || message.member.roles.cache?.size <= 0) await message.member.fetch();
        message.channel.settings.ignore.forEach(ignoreRole => {
            if(ignore) return;
            if(message.member.roles.cache.get(ignoreRole)) ignore = true;
        });

        if(ignore) return;

        ///

        // mode 4 
        if(message.channel.settings.mode === 4) {
            let messages = message.channel.messages.cache;

            if(message.channel.settings.filters.includes(client.filters.FLAGS.PINNED)) {
                messages = await message.channel.messages.fetchPinned(true).catch(client.Logger.error);

            } else {
                // first = neu
                let fetchedMessages = await message.channel.messages.fetch({ limit: 100, before: message.channel.messages.cache.last()?.id }, { cache: true, force: false }).catch(client.Logger.error);

                if(fetchedMessages.size >= 100) {

                    while(Math.floor(fetchedMessages.size / 100)) {

                        let newMessages = await message.channel.messages.fetch({ limit: 100, before: fetchedMessages.last()?.id }).catch(client.Logger.error);
                        newMessages.forEach((v, k) => fetchedMessages.set(k, v));

                    };
                };
                fetchedMessages.forEach((v, k) => messages.set(k, v))
            };

            if(!(message.channel.settings?.filters?.includes(client.filters.FLAGS.ALL) || message.channel.settings?.filters?.length === 0))
                messages = client.filterMessages(messages, message.channel.settings.filters, message.channel.settings.filterUsage);

            for(let i = 0; i < message.channel.settings.limit; i++) {
                messages.delete(messages.firstKey());
            }
                                        // ?
            let data = await client.bulkDelete(message.channel.id, messages);

            if(data && data?.length > 0)
                client.createDeleteLog(message.channel.id, data) 
        };
    };
};

module.exports = MessageCreateEvent;