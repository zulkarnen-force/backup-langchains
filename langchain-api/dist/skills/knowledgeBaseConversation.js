import { OpenAI, PromptTemplate } from "langchain";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate, } from "langchain/prompts";
import { HNSWLib } from "langchain/vectorstores";
export const KnowledgeBaseConversation = async (input, topics, vectorStores) => {
    const model = new ChatOpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
    const model2 = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
    //conversation history
    const conversationHistory = "";
    //inquiry embedding
    const inquirerTemplate = `Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
    You should follow the following rules when generating and answer:
    - Always prioritize the user prompt over the conversation log.
    - Ignore any conversation log that is not directly related to the user prompt.
    - Only attempt to answer if a question was posed.
    - The question should be a single sentence.
    - You should remove any punctuation from the question.
    - You should remove any words that are not relevant to the question.
    - If you are unable to formulate a question, respond with the same USER PROMPT you got.  
    USER PROMPT: {userPrompt}  
    CONVERSATION LOG: {conversationHistory}  
    Final answer:`;
    const inquiryChain = new LLMChain({
        llm: model2,
        prompt: new PromptTemplate({
            template: inquirerTemplate,
            inputVariables: ["userPrompt", "conversationHistory"],
        }),
    });
    const inquirerChainResult = await inquiryChain.call({
        userPrompt: input,
        conversationHistory,
    });
    const inquiry = inquirerChainResult.text;
    const embedder = new OpenAIEmbeddings({
        modelName: "text-embedding-ada-002",
    });
    const embeddings = await embedder.embedQuery(inquiry);
    //load vectorstore from directory
    const knowledgeLib = vectorStores;
    const contents = [];
    for (let n in knowledgeLib) {
        const directory = "storage/vectors/" + knowledgeLib[n];
        let vsLoad = await HNSWLib.load(directory, new OpenAIEmbeddings());
        let result = await vsLoad.similaritySearchVectorWithScore(embeddings, 1);
        result.map((val) => {
            contents.push(val[0].pageContent);
        });
    }
    const document = contents.join("/n");
    //console.log(document);
    //
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(`You are helpful assistant. You should follow the following rules when give response:
          - Give answer based on DOCUMENT.
          - If DOCUMENT is empty give information from another source and ask to user that the information is not from the document.
          - If the user input do not relate with DOCUMENT, guide user to ask about the topics: {topics}.
          - Provide response in Indonesian Language.
          DOCUMENT: {document}
          CONVERSATION HISTORY: {conversationHistory}`),
        HumanMessagePromptTemplate.fromTemplate("{text}"),
    ]);
    const chain = new LLMChain({
        prompt: chatPrompt,
        llm: model,
    });
    const response = await chain.call({
        topics: topics,
        document: document,
        conversationHistory: conversationHistory,
        text: inquiry,
    });
    return response.text;
};
//# sourceMappingURL=knowledgeBaseConversation.js.map