const Discord = require('discord.js');
const bot = new Discord.Client();
const formattingguide = new Discord.Attachment('./writebots-discord-formatting-guide.pdf');

const token = 'NTkxNjUxNDkyMzczNzI1MTg0.XRZSUA.IJMb1e4q6vg1TIx-IxEk1a6kumo';
var PREFIX = '!';

bot.on('ready', () =>{
    console.log('Bot online.');
})

bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`Welcome to ADS, ${member}`)
})

global.servers = {};

bot.on('message', msg=>{
    if(msg.author.bot) return;

    let args  = msg.content.substring(PREFIX.length).split(" ");
    
    switch (args[0]) {
        
        case 'kick':
            if(msg.member.roles.find(r => r.name === 'AM | Administrator')){

                // Easy way to get member object though mentions.
                var member = msg.mentions.members.first();
                
                // Kick
                if(args[2]){
                    member.kick(args[2]).then((member) => {
                        // Success message
                        msg.channel.send(member.displayName + " has been successfully kicked! Bye " + member.displayName + "!");
                    }).catch(() => {
                        // Fail message
                        msg.channel.send("Failed to kick. Please try again or check this bot's permissions.");
                    })
                } else if(!args[2]){
                    member.kick('Reason not defined by admin.').then((member) => {
                        // Successmessage
                        msg.channel.send(member.displayName + " has been successfully kicked! Bye ");
                    }).catch(() => {
                        // Failmessage
                        msg.channel.send(`Failed to kick. Please try again or check this bot's permissions.`);
                    })
                } 
            }else if(!msg.member.roles.find(r => r.name === 'AM | Administrator')){
                msg.channel.sendMessage('You are not an Admin. If you think this is a mistake, please contact Archi at ArchiPlaysPro#9035.');
            }
        break;

        case 'updateprefix':
            msg.channel.sendMessage('This command is under development.')
        break;

        case 'ban':
                if(msg.member.roles.find(r => r.name === 'AM | Administrator')){

                    // Easy way to get member object though mentions.
                    var member= msg.mentions.members.first();
                    
                    // Ban
                    if(args[2]){
                        member.ban(args[2]).then((member) => {
                            // Successmessage
                            msg.channel.send(member.displayName + " has been successfully banned! Bye ");
                        }).catch(() => {
                            // Failmessage
                            msg.channel.send("Failed to ban. Please try again or check this bot's permissions.");
                        })
                    } else if(!args[2]){
                        member.ban('Reason not defined by admin.').then((member) => {
                            // Successmessage
                            msg.channel.send(member.displayName + " has been successfully banned! Bye ");
                        }).catch(() => {
                            // Failmessage
                            msg.channel.send(`Failed to ban. Please try again or check this bot's permissions.`);
                        })
                    } 
                }else if(!msg.member.roles.find(r => r.name === 'AM | Administrator')){
                    msg.channel.sendMessage('You are not an Admin. If you think this is a mistake, please contact Archi at ArchiPlaysPro#9035.');
                }
        break;

        case 'serverInfo':
                var newEmbed = new Discord.RichEmbed()
                .setDescription(`Server info for ${msg.guild.name}`)
                .addField('Server created on:', msg.guild.createdAt)
                .addField('Server members:', msg.guild.memberCount)
                .addField('Owned by', msg.guild.owner)
                .setThumbnail(msg.guild.iconURL)
                .setFooter('Thank you for using ADS bots!')

                msg.channel.sendEmbed(newEmbed);
        break;

        case 'redeemkey':
            if(args[1] === 'staff'){
                if(msg.member.roles.find(r2 => r2.name === 'AM | Administrator')){
                    msg.author.sendMessage('Thank you for using our staff program!');
                } else {
                    msg.channel.sendMessage('You do not have permission to use this command.')
                }
            }

            if(args[1] === 'help'){
                msg.reply('I\'m opening a ticket channel for you. Please wait until a staff member adds you. Thanks :smiley:');
                msg.guild.owner.sendMessage('Someone wants to redeem a key! Name: '+msg.author)
            }

            if(!args[1]){
                if(msg.member.roles.find(r => r.name === 'Buyer')){
                    var buychannel = msg.guild.channels.find(channel1 => channel1.name === 'redeem-channel');
                    
                    if(!msg.channel === buychannel){
                        msg.reply(`Please do not type this command in any other channel other than ${buychannel}.`);
                    }
                } else {
                    msg.reply('test');
                }
            }
        break;

        case 'discordformatguide':
                msg.channel.sendMessage('Here is your formatting guide, ' + msg.author);
                msg.channel.send(formattingguide);
        break;

        case 'help':
                var newEmbed1 = new Discord.RichEmbed()

                .setDescription('Commands for Archi\'s Dev Services Bot.')
                .addField('help', 'What you are in right now :/')
                .addField('discordformatguide','Sends a discord formatting guide.')
                .addField('redeemkey','Redeems a product key you purchased. (WIP)')
                .addField('serverinfo','Shows this servers info.')
                .addField('ban','Bans a user.')
                .addField('updateprefix','Changes the current prefix')
                .addField('kick','Kicks a user')
                .setThumbnail(bot.iconURL)
                .setFooter('More commands coming soon!')
                .setColor('#ff0000');

                msg.channel.sendEmbed(newEmbed1);
        break;

        case 'await':
            msg.awaitReactions(':smile:'){
                
            }
        break;

        
    }
})



bot.login(token);
