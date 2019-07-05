const commando = require(discord.js-commando);
const ytdl = require('ytdl-core');

function Play(connection, msg){
    var server = servers[msg.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function(){
        if(server.queue[0]){
            Play(connection, msg);
        } else {
            
        }
    });
}

class JoinChannelCommand extends commando.Command {
    constructor(client) {
        super(client,{
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Joins the voice channel of a commando.'
        });
    }
    async run(msg, args) {
        if(msg.member.voiceChannel){
            if(!msg.member.voiceConnection){
                if(!servers[msg.guild.id]){
                    servers[msg.guild.id] = {
                        queue: []
                    }
                }
                var server = servers[msg.guild.id]
                msg.member.voiceChannel.join()
                .then(connection =>{
                    msg.reply('Successfully joined.');
                })
            }
        } else {
            msg.reply('Please join the voice channel you want me to be in!');
            Play(connection, msg);
        }
    }
}

module.exports = JoinChannelCommand;