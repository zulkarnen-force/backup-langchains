import { LlmChain } from "agents/llmChain.js";
export default class Simplebot {
    constructor(inputMessage) {
        Object.defineProperty(this, "inputMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.inputMessage = inputMessage;
    }
    async startBot(inputMessage) {
        //return await new SendText('Hallo! You said: '+inputMessage.content).send();
        return await LlmChain(inputMessage.content);
    }
}
//# sourceMappingURL=index.js.map