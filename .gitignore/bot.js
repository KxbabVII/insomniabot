const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsFile = files.filter(f => f.split(".").pop() === "js");
  if (jsFile.length <= 0) {
    console.log("Je ne trouve pas cette commande");
    return;
  }

  jsFile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on('ready', function() {
  setInterval(async () => {

const statuslist = config.statuslist

const random = Math.floor(Math.random() * statuslist.length);

try {
  await bot.user.setPresence({
      game: {
        name: `${statuslist[random]}`,
        type: `${config.type}`,
        url: `${config.url}`
      },
      status: `${config.status}`
  });
} catch (error) {
  console.error(error);
}
}, 6000);
});

bot.on("message", message => {
  if (message.author.bot) return;

  const id = config.id;
  const prefix = config.prefix;
  const messageArray = message.content.split(" ");
  const command = messageArray[0];
  const args = messageArray.slice(1);

  if (prefix == command.slice(0, 1)) {
    let commandFile = bot.commands.get(command.slice(prefix.length));
    if (commandFile) commandFile.run(bot, message, args, id);
  }
  
})

bot.login(config.token);