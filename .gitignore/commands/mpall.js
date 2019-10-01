const Discord = require("discord.js");

module.exports.run = async (bot, message, args, id) => {

        if (message.author.id != id) return;
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        message.delete()


        let errorEmbed = new Discord.RichEmbed()
        .setDescription("Veuillez saisir un texte | Syntaxe : /mpall [TEXTE]")
        .setColor('RANDOM')
        if (!args[0]) return message.channel.send(errorEmbed)

        let mpallText = (args.join (' '));
        
        let mpallEmbed = new Discord.RichEmbed()

        .setDescription(`${mpallText}`)
        .setColor("RANDOM")

        message.guild.members.forEach(member => {
          member.send(mpallEmbed).catch(e => {});
        })

        let successEmbed = new Discord.RichEmbed()
        .setDescription("Le MP a été envoyé avec succès !")
        .setColor("RANDOM")

        message.channel.send(successEmbed)

        console.log("Mpall exécuté")
      }
    
    
module.exports.help = {
    name: "mpall"
};