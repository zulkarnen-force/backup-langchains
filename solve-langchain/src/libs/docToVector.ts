import { PDFLoader, TextLoader } from "langchain/document_loaders";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { HNSWLib } from "langchain/vectorstores";
import fs from "fs";

export class DocToVector {
  docs: any;
  loader: any;
  async createVectorstore(path: string, mimetype: string, fileId: string) {
    console.log('mimetype', mimetype)
    switch (mimetype) {
      case "text/plain":
        this.loader = new TextLoader(path);
        break;
      case "application/pdf":
        this.loader = new PDFLoader(path);
        break;
      default:
        return;
    }
    this.docs = await this.loader.loadAndSplit();
    console.log('docs', this.docs)
    const vectorStore = await HNSWLib.fromDocuments(
      this.docs,
      new OpenAIEmbeddings()
    );
    this.createFolderIfNotExist(fileId);
    const directory = "storage/vectors/" + fileId;
    let result;
    try{
        await vectorStore.save(directory);
        result = directory;
    }catch{
        result = new Error(`Can't create vectorstore for the file`);
    }    
    return result;
  }
  async createFolderIfNotExist(key: string) {
    const directoryPath = "storage/vectors/" + key;
    // check if directory exists
    if (!fs.existsSync(directoryPath)) {
      // if not, create directory
      fs.mkdirSync(directoryPath);
      return true;
    } else {
      return false;
    }
  }
}
