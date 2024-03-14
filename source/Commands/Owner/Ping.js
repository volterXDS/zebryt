const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		aliases: ["ping"],
		name: "ping",
        help: "ping",
		enabled: true
	},

	run: async ({ client, message, args, embed, guild, author }) => {

		const chewy = await client.users.fetch("933833033579114506");

		message.reply({ embeds: [new MessageEmbed()
.setColor("RANDOM")
.setAuthor({name:message.member.displayName , iconURL:message.member.displayAvatarURL()})
.setFooter({ text: "Minedox", iconURL: chewy.avatarURL({ dynamic: true }) })
.setDescription(`
**${client.ws.ping}ms**
`)
] })
}};
