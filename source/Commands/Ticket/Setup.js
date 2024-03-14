const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    config: {
        aliases: ["setup"],
        name: "setup",
        help: "setup",
        enabled: true
    },

    run: async ({ client, message, args, embed, guild, author }) => {
        message.delete();

		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('Teknik')
				.setLabel('Teknik Destek')
				.setStyle('SECONDARY')
				.setEmoji('🔧'),
			new MessageButton()
				.setCustomId('satis')
				.setLabel('Satış Öncesi Destek')
				.setStyle('DANGER')
				.setEmoji('⁉️'),
			new MessageButton()
				.setCustomId('Sponsorluk')
				.setLabel('Sponsorluk')
				.setStyle('SUCCESS')
				.setEmoji('🤝')
		);

        message.channel.send({
            embeds: [{
                title: 'Destek Talebi',
                description: 'Ürün Satın Alımı/Kullanıcı bildirme/Destek/Satış Öncesi Destek vb. Durumlar için destek talebi oluşturabilirsiniz.\n\n📝 Not: Ücretsiz paketler desteği sadece 1-2 kere verilmektedir.\nSite Destek İçin: [Tıkla](http://minedox.tr/)',
                color: '58628B',
                footer: {
                    text: 'Powered by minedox.tr'
                }
            }],
            components: [row]
        });
    }
};
