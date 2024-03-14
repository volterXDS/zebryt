const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { kategori, yetkilirole } = require("../Configurations/Server_Settings.js");

module.exports = async (interaction) => {
    let roleStaff = interaction.guild.roles.cache.get(yetkilirole);
    let kategorioc = kategori;

    if (!interaction.isButton()) return;
    const ticketType = interaction.customId;

    let aciktalepoc = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);
    if (ticketType === 'delete_ticket') {
        if (aciktalepoc) {
            aciktalepoc.delete();
            return interaction.reply({ content: 'Bilet başarıyla kapatıldı.', ephemeral: true });
        } else {
            return interaction.reply({ content: 'Kapatılacak bir bilet bulunamadı.', ephemeral: true });
        }
    }

    if (aciktalepoc) return interaction.reply({ content: 'Sunucuda zaten açık bir biletin var.', ephemeral: true });
    const deleteButton = new MessageButton()
        .setCustomId('delete_ticket')
        .setLabel('Bileti Kapat')
        .setStyle('DANGER');
    interaction.guild.channels.create(`${interaction.user.username}-ticket`, {
        type: 'GUILD_TEXT',
        topic: `${interaction.user.id}`,
        parent: `${kategorioc}`,
        permissionOverwrites: [
            { id: interaction.guild.id, deny: [Permissions.FLAGS.VIEW_CHANNEL] },
            { id: interaction.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL] },
            { id: roleStaff, allow: [Permissions.FLAGS.VIEW_CHANNEL] }
        ]
    }).then((c) => {
        const embed = new MessageEmbed()
            .setTitle(`${ticketType} Destek`)
            .setDescription('Yetkililerimiz kısa süre içinde sizinle ilgilenecektir. Lütfen bekleyiniz.')
            .setFooter('Minedox Ticket');

        const row = new MessageActionRow().addComponents(deleteButton);

        c.send({ embeds: [embed], content: `${roleStaff}, ${interaction.user} kullanıcısı sizi bekliyor...`, components: [row] });
        interaction.reply({ content: `Biletin başarıyla açıldı. <#${c.id}>`, ephemeral: true });
    });
};

module.exports.config = {
    name: "interactionCreate"
};
