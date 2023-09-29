import * as dotenv from "dotenv";
dotenv.config();
import { ChatMemory } from "chatmemory.js";
import { Telegraf } from 'telegraf';
//import { message } from 'telegraf/filters';
const bot = new Telegraf('1184159125:AAFdfr5oZ9_G4zmtttc4D7onsojkIy4iS-Y');
const chatHistory = {};
bot.on('text', async (ctx) => {
    let chatID = ctx.message.chat.id;
    let chatText = ctx.message.text;
    //write chat history
    if (chatHistory[chatID] == undefined)
        chatHistory[chatID] = 'HumanMessage: ' + chatText + ". ";
    else
        chatHistory[chatID] += 'HumanMessage: ' + chatText + ". ";
    const chatMemory = new ChatMemory(chatHistory[chatID.toString()], chatText);
    let msgReplay = await chatMemory.sendMessage();
    // Explicit usage
    await ctx.telegram.sendMessage(ctx.message.chat.id, msgReplay);
    //update chatHistory
    chatHistory[chatID.toString()] += 'AIMessage: ' + msgReplay;
    //console.log(chatHistory);
});
bot.launch();
//# sourceMappingURL=telegram_backup.js.map