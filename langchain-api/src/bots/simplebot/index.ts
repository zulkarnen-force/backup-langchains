import { LlmChain } from "agents/llmChain.js";

export default class Simplebot{
    inputMessage: any;
    
    constructor(inputMessage: any)
    {
        this.inputMessage = inputMessage;
    }

    async startBot(inputMessage: any)
    {
        //return await new SendText('Hallo! You said: '+inputMessage.content).send();
        return await LlmChain(inputMessage.content);
    }

}