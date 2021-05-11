module.exports = {
	name: 'login',
	description: 'Login a new User!',
    guildOnly: true,
	async execute(message, args, client) {
        if(message.channel.type === 'dm'){         
            if(!args[0]){
                message.author.send('O usuário não foi preenchido tente novamente,  tente !login <email> <senha>');
                return;
            }else if(!args[1]){
                message.author.send('A senha não foi preenchida tente novamente, !login <email> <senha>');
                return;
            }else{
              
                const Guilds = client.guilds.cache.map(guild => guild);

                var user = await Guilds[0].members.fetch(message.author.id);
          
                if(user.roles.cache.get('840763062067265556')){
                    message.author.send("Sua conta já está verificada!!")
                    return;
                }else{       
                    user.roles.add('840763062067265556');
        
                    user.send('Sua conta foi verificada com sucesso , nos vemos pelo servidor !!');
                    return;
                }               
            
            }
        }
	},
};