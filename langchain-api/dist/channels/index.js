import { TelegramBots } from "./telegram.js";
export class MessagingChannels {
    runChannels() {
        new TelegramBots().runTelegramBots();
        console.log('run channels');
    }
    async incomingMesagesHanlder(botID, message) {
        const modulePath = `../bots/${botID}/index.ts`;
        const { default: BotClass } = await import(modulePath);
        const botInstance = new BotClass();
        return await botInstance.startBot(message);
    }
}
//# sourceMappingURL=index.js.map