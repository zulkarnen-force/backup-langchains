import { ChatOpenAI } from "langchain/chat_models";
import { HumanChatMessage } from "langchain/schema";
const chat = new ChatOpenAI({ temperature: 0 });
export class BasicChat {
    async testChat() {
        const response = await chat.call([
            new HumanChatMessage("Translate this sentence from English to French. I love programming."),
        ]);
        return response;
    }
}
//# sourceMappingURL=BasicChat.js.map