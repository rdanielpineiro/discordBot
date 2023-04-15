require("dotenv").config()
const discord = require("discord.js");
const client = new discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
  });

    const PREFIX=process.env.PREFIX



client.slash = new discord.Collection()
client.once('ready', async ()=>{
    console.log('*****')
    console.log(`Bot: ${client.user.username}`)
    client.user.setStatus('invisible')

    console.log('*****')
})


const me = new discord.MessageEmbed().setColor([0,255,255])
.setTitle('Split Money')
.setDescription('Bot for add/remove Roles')
.setThumbnail('https://thumbs.dreamstime.com/z/lotus-flower-7350976.jpg')
client.on('messageCreate', async message=>{
   
    if(message.author.bot){
        return console.log()
    }
    console.log(`Channel ID: ${message.channelId}`)
    const idChannel = message.channelId

    if(message.content.startsWith(PREFIX)){
    // message.reply('Command With Prefix');((
        const arguments = message.content.slice(PREFIX.length).split(/ +/)
        console.log(arguments)
        //This is shift take the 1st element in array [1,2,3] take 1
        const command = arguments.shift().toLocaleLowerCase()
      

        const remove = new discord.MessageEmbed()
        .setColor('RED')
        .setTitle(command.toUpperCase())
        .setAuthor(message.author.username,message.author.displayAvatarURL())
        // .setDescription(`Remove members for a roll`)
        .setThumbnail('https://media.discordapp.net/attachments/701333370671726602/1090753511244976209/Render_36.gif?width=468&height=468')

        const add = new discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(command.toUpperCase())
        .setAuthor(message.author.username,message.author.displayAvatarURL())
        // .setDescription(`Add member for a roll`)
        .setThumbnail('https://media.discordapp.net/attachments/701333370671726602/1090753511244976209/Render_36.gif?width=468&height=468')

        
        if(message.member.permissions.has('ADMINISTRATOR')){
        //this command es for check de logic in the code
        switch(command){
        case 'addrole':{
               
                const rolefind = arguments[arguments.length - 1];
                const role = message.guild.roles.cache.find(role => role.name ===rolefind); 
                const users = message.mentions.users.map(user => message.guild.members.fetch(user));
                
                if (users.length > 0 && role) {
                  for (const memberPromise of users) {
                    const member = await memberPromise;
                    if (!member.roles.cache.has(role.id)) {
                      member.roles.add(role);
                        // message.channel.send(`Add to ${rolefind} member ${member.user.username}!`);
                    } else {
                        message.channel.send(`${member.user.username} already have this roll ${rolefind} !`); 
                    }
                  }
                    const embededMessage=await message.channel.send({embeds:[add]});
                    const update= add.setDescription(`Add member for a ${rolefind}`)
                    embededMessage.edit({embeds:[update]})
                  return
                } 
                return message.channel.send(`Role of user incorrect`);
          }
        case 'removerole':{
            // message.channel.send({embeds: [remove]})
                const rolefind = arguments[arguments.length - 1];
                const role = message.guild.roles.cache.find(role => role.name === rolefind); 
                const users = message.mentions.users.map(user => message.guild.members.cache.get(user.id)); 
            
                if (users.length > 0 && role) {
                  for (const member of users) {
                    if (member) {
                      if (member.roles.cache.has(role.id)) {
                        member.roles.remove(role);
                        // message.channel.send(`${member.user.username} remove the role ${rolefind}`);
                      } else {
                        message.channel.send(`${member.user.username} doesnt have the ${rolefind}`);
                      }
                    } else {
                       message.channel.send(`didnt find "${user}"!`);
                    }
                  }
                  const embededMessage=await message.channel.send({embeds:[add]});
                  const update= add.setDescription(`Remove member for a ${rolefind}`)
                  embededMessage.edit({embeds:[update]})
                  return
                } else {
                    return message.channel.send(`Role of user incorrect`);
                }
        }
    }
}
    }
})


client.login(process.env.DSTOKEN)
console.log('Ready')
