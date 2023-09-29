import { TextLoader } from "langchain/document_loaders";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { HNSWLib } from "langchain/vectorstores";
import fs from 'fs';
export async function AddKnowledgeFromText(textFile, key) {
    // Create docs with a loader
    const loader = new TextLoader(textFile);
    const docs = await loader.loadAndSplit();
    // Load the docs into the vector store
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
    createFolderIfNotExist(key);
    const directory = "storage/vectors/" + key;
    await vectorStore.save(directory);
    console.log('Knowledge has saved!');
}
async function createFolderIfNotExist(key) {
    const directoryPath = 'storage/vectors/' + key;
    // check if directory exists
    if (!fs.existsSync(directoryPath)) {
        // if not, create directory
        fs.mkdirSync(directoryPath);
        console.log('Directory created successfully!');
    }
    else {
        console.log('Directory already exists!');
    }
}
//# sourceMappingURL=addKnowledgeFromText.js.map