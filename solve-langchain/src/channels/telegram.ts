import { Telegraf } from "telegraf";
import * as fs from "fs";
import * as path from "path";
import { MessagingChannels } from "./index.js";

export class TelegramBots {
  runTelegramBots() {
    // Get the directory path of the current module file
    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    // Define the path to the bots directory relative to this module
    const botsDir = path.join(__dirname, "../bots");

    // Get a list of bot directories in the bots directory
    const botDirs = fs
      .readdirSync(botsDir)
      .map((file) => path.join(botsDir, file))
      .filter((filePath) => fs.statSync(filePath).isDirectory());

    // Create a dictionary to store bot configurations
    const botConfigs: Record<string, any> = {};

    // Load the bot configs
    for (const botDir of botDirs) {
      const configPath = path.join(botDir, "bot.config.json");
      const rawConfig = fs.readFileSync(configPath);
      const config = JSON.parse(rawConfig.toString());
      botConfigs[botDir] = config;
    }

    // Create a dictionary to store bot instances
    const bots: { [key: string]: any } = {};

    // Create a bot instance for each bot directory and export it
    for (const botDir of botDirs) {
      const config = botConfigs[botDir];
      const botID = config.botID;
      const token = config.channels.telegram.token;
      const bot = new Telegraf(token);
      bots[botDir] = bot;
      bot.start((ctx) => ctx.reply("Welcome!"));
      bot.on("text", async (ctx) => {
        let message = {
          userID: ctx.message.from.id,
          channel: "telegram",
          chatID: ctx.message.chat.id,
          type: "text",
          content: ctx.message.text,
        };
        //save to conversation
        //let db = new DbConnect();
        //db.addChatHistory()
        //send message to incoming message handler
        let result = await new MessagingChannels().incomingMesagesHanlder(
          botID,
          message
        );
        ctx.reply(result);
      });
      bot.launch();
      console.log("bot alive");
    }
  }

  async runTelegramBotById(botID: string, token: string)
  {
    const bot = new Telegraf(token);
    bot.start((ctx) => ctx.reply("Welcome!"));
    bot.on("text", async (ctx) => {
      let message = {
        userID: ctx.message.from.id,
        channel: "telegram",
        chatID: ctx.message.chat.id,
        type: "text",
        content: ctx.message.text,
      };     
      //send message to incoming message handler
      let result = await new MessagingChannels().incomingMesagesHanlder(
        botID,
        message
      );
      ctx.reply(result);
    });
    bot.launch();
    console.log(botID+" is alive..");     
  }
}
