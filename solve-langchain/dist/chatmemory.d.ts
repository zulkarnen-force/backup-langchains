import { ChatOpenAI } from "langchain/chat_models";
export declare class ChatMemory {
    chatHistory: any;
    humanMessage: any;
    chat: ChatOpenAI;
    constructor(chatHistory: any, humanMessage: any);
    sendMessage(): Promise<string>;
}
