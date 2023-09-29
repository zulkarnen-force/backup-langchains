import { CheerioWebBaseLoader } from "langchain/document_loaders";
import { NodeHtmlMarkdown } from "node-html-markdown";
export class DocumentLoaders {
    constructor() {
        Object.defineProperty(this, "webLoader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mdConverter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.webLoader = new CheerioWebBaseLoader("https://news.ycombinator.com/item?id=34817881");
        this.mdConverter = new NodeHtmlMarkdown();
    }
    async webDocumentLoader() {
        let doc = await this.webLoader.load();
        //let mdDoc = await this.mdConverter.translate(doc.pageContent);
        return "doc:" + JSON.stringify(doc);
    }
}
//# sourceMappingURL=documentLoader.js.map