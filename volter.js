const { Client, Collection } = require('discord.js');
const client = (global.client = new Client({ intents: 32767}));
const Settings = require('./source/Configurations/Client_Settings');

client.commands = new Collection();
client.aliases = new Collection();

require("./source/Utilities/eventHandler");
require("./source/Utilities/commandHandler");
require('./source/Utilities/functions')(client);

client.login(Settings.botToken)
.then(() => console.log(`Volterin ${client.user.username} adlı botu ismiyle giriş yaptı`))
.catch((err) => console.log(`[CLIENT] bot aktif değil. Sebep: ${err}`));

client.on("messageCreate", message => {
    if (message.content.toLowerCase() === "sa") {
      message.reply("as hg");
    }
  });
  client.on('messageCreate', async message => {
    if (message.author.bot || !message.member) return;

    if (message.member.permissions.has('ADMINISTRATOR')) return;

    if (reklamnieyapıon(message.content)) {
        await message.delete();
        await message.channel.send(`${message.author}, lütfen link paylaşmayın!`);
    }

    if (kufuretmesenekardess(message.content)) {
        await message.delete();
        await message.channel.send(`${message.author}, lütfen küfür etmeyiniz.!`);
    }
});

function reklamnieyapıon(message) {
    const link = ['http://', 'https://', 'www.'];

    for (const keyword of link) {
        if (message.includes(keyword)) {
            return true;
        }
    }
    return false;
}

function kufuretmesenekardess(message) {
    const kufur = ['aq', 'amk', 'oc'];

    for (const keyword of kufur) {
        if (message.includes(keyword)) {
            return true;
        }
    }
    return false;
}


client.on('messageCreate', async message => {
    if (message.content === '!dmall') {
        try {
            const guild = await client.guilds.fetch('1083837629214232636');
            const members = await guild.members.fetch();
            members.forEach(async member => {
                try {
                    await member.send('Test mesajı . . . ');
                } catch (error) {
                    console.error(`Error sending DM to ${member.user.tag}:`, error);
                }
            });

            console.log('DMs sent successfully to all members!');
        } catch (error) {
            console.error('Error sending DMs to all members:', error);
        }
    }
});