const Discord = require ("discord.js");

module.exports.run = async (bot, message, args, id) => {

  if (message.author.id != id) return
  if (message.author.bot) return
  message.delete()

  let errorSayEmbed = new Discord.RichEmbed()
  .setDescription("Veuillez saisir un texte. | Syntaxe : /say [TEXTE]")
  .setColor("RANDOM")
  if (!args[0]) return message.channel.send(errorSayEmbed)

  let sayMessage = args.join(" ");
  
  let sayMessageEmbed = new Discord.RichEmbed()
  .setDescription(sayMessage)
  .setColor("RANDOM")

  message.channel.send(sayMessageEmbed)
  
  console.log("Commande say exécuté")
}

module.exports.help = {
    name: "say"
};