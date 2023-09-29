import { initializeAgentExecutor } from "langchain/agents";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAI } from "langchain/llms";
import { BufferMemory } from "langchain/memory";
import { ChainTool } from "langchain/tools";
import { HNSWLib } from "langchain/vectorstores";

export const conversationAgent = async (input: string) => {
    const model = new OpenAI({ temperature: 0 });

    //load vectorstore from directory
    const directory = 'storage/vectors/soekarno';
    const vectorStore = await HNSWLib.load(
        directory,
        new OpenAIEmbeddings()
    );
    //create chain
    const chain = VectorDBQAChain.fromLLM(model, vectorStore);
    const qaTool = new ChainTool({
        name: "my-qa-tool",
        description: "My custom QA tool",
        chain: chain,
      });

    const tools = [
        qaTool      
    ];
    //create executor
    const executor = await initializeAgentExecutor(
        tools,
        model,
        "zero-shot-react-description"
    );
   
    //result
    const result = await executor.call({input});
    return result.output;
}