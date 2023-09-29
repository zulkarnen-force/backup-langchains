import { ChatOpenAI } from "langchain/chat_models";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
export class ChatMemory {
    constructor(chatHistory, humanMessage) {
        Object.defineProperty(this, "chatHistory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "humanMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new ChatOpenAI({ temperature: 0 })
        });
        this.chatHistory = chatHistory;
        this.humanMessage = humanMessage;
    }
    async sendMessage() {
        let systemPrompt = "You are a helpful assistant. You should follow the following rules when generating and answer: - Always prioritize the user prompt over the conversation log, - use Bahasa. CONVERSATION LOG: " + this.chatHistory;
        const response = await this.chat.call([
            new SystemChatMessage(systemPrompt),
            new HumanChatMessage(this.humanMessage)
        ]);
        let numToken = this.chat.getNumTokens(systemPrompt) + this.chat.getNumTokens(this.humanMessage);
        console.log(numToken);
        return response.text;
    }
}
;
//# sourceMappingURL=chatmemory.js.map