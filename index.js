const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.on('ready', () => {
	client.user.setUsername('LunarDevs');
	client.user.setActivity('Descobrindo a melhor linguagem ...');
	client.user.setStatus('dnd');
});

client.on('message', message => {

    if(message.author.bot){
        return;
    }

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (!command) return;

	if (!client.commands.has(command)) return;

    if (command.guildOnly && message.channel.type === 'dm') return;

	try {
		client.commands.get(command).execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('Este comando não existe');
	}
});


client.on('raw', async (dados) => {

	if(dados.t == "MESSAGE_REACTION_ADD"){

		var msg_id = dados.d.message_id;

		if(msg_id == "841099281963286581"){
			const Guilds = client.guilds.cache.map(guild => guild);

			var user = await Guilds[0].members.fetch(dados.d.user_id);
	  
			if(user.roles.cache.get('840763062067265556')){
				user.send("Sua conta já está verificada!!")
				return;
			}else{
				user.send('Para validar sua conta ... Digite !login <email> <senha> , esses dados devem estar cadastrados na plataforma')
			}
			
		}
	}
})

client.on('guildMemberAdd', (member) => {
	member.guild.channels.cache.get('841105263246573578').send(`Seja bem vindo(a) ${member.user}, esperamos que você aproveite a comunidade para espalhar conhecimento e tentar ser alguem melhor todos os dias, para ativar sua conta vá para *#veja*`);
});

client.login(token);