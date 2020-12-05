const Discord = require("discord.js");
const Database = require("@replit/database")
const db = new Database()
const client = new Discord.Client();

const prefix = "kyt_";

const story = ['Once upon a time there was a dear little girl who was loved by every one who looked at her, but most of all by her grandmother, and there was nothing that she would not have given to the child. Once she gave her a little cap of red velvet, which suited her so well that she would never wear anything else. So she was always called Little Red Riding Hood.',
'One day her mother said to her, "Come, Little Red Riding Hood, here is a piece of cake and a bottle of wine. Take them to your grandmother, she is ill and weak, and they will do her good. Set out before it gets hot, and when you are going, walk nicely and quietly and do not run off the path, or you may fall and break the bottle, and then your grandmother will get nothing. And when you go into her room, don\'t forget to say, good-morning, and don\'t peep into every corner before you do it."']

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }
  else if(command === 'helpsay'){
    message.channel.send(args.join(' '))
    message.delete()
  }
  else if (command === "yell") {
    const string = args.join(" ");
    message.channel.send(string.toUpperCase());
}
  else if(command === 'story'){
    let index = parseInt(args[0]) - 1 
    message.channel.send(story[index])
  }
  else if (command === "set") {
    console.log(args)

  db.set(args[0], args[1]).then(() => {
    message.channel.send(`I saved <${args[1]}> to ${args[0]}`);
  });
}
else if (command === "get") {
  db.get(args[0]).then(value => {
    message.channel.send(`The link for ${args[0]} is <${value}>!`);
  })
}
else if (command === "list") {
  db.list().then(value => {
    value.forEach(key =>{
      db.get(key).then(link => {
        message.channel.send(`${key}: <${link}>`)
      });
    });
  });
}

else if (command === "name") {
 message.channel.send('Your name is Kang Yi Te')
}

});

client.login(process.env.BOT_TOKEN);