import { CheerioWebBaseLoader } from "langchain/document_loaders";
import { NodeHtmlMarkdown } from "node-html-markdown";

export class DocumentLoaders{
    webLoader: any;
    mdConverter: any;
    constructor()
    {
        this.webLoader = new CheerioWebBaseLoader("https://news.ycombinator.com/item?id=34817881");
        this.mdConverter = new NodeHtmlMarkdown();
    }

    async webDocumentLoader()
    {        
        let doc = await this.webLoader.load();
        //let mdDoc = await this.mdConverter.translate(doc.pageContent);
        return "doc:"+JSON.stringify(doc);
    }

    
}