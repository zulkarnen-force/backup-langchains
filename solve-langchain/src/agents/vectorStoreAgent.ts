import { VectorStoreInfo, VectorStoreToolkit, createVectorStoreAgent } from "langchain/agents";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAI } from "langchain/llms";
import { HNSWLib } from "langchain/vectorstores";

export const vectorStoreAgent = async (input:string) => {
    const model = new OpenAI({ temperature: 0, modelName:'gpt-3.5-turbo' });

    //load vectorstore from directory
    const directory = 'storage/vectors/soekarno';
    const vectorStore = await HNSWLib.load(
        directory,
        new OpenAIEmbeddings()
      );
    
      /* Create the agent */
    const vectorStoreInfo: VectorStoreInfo = {
        name: "soekarno_biography",
        description: "all about soeakarno",
        vectorStore,
    };

    const toolkit = new VectorStoreToolkit(vectorStoreInfo, model);
    const agent = createVectorStoreAgent(model, toolkit);
    const result = await agent.call({ input });
    //console.log(result);
    return result.output;
}