import { CheerioCrawler, Dataset, htmlToText } from 'crawlee';
import { NodeHtmlMarkdown } from 'node-html-markdown';
export class Crawler {
    constructor(urls) {
        Object.defineProperty(this, "urls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.urls = urls;
    }
    async start() {
        const crawler = new CheerioCrawler({
            // Function called for each URL
            async requestHandler({ request, body }) {
                // Save data to default dataset
                let html = body.toLocaleString();
                let txt = await htmlToText(html);
                let mdDoc = await NodeHtmlMarkdown.translate(txt);
                await Dataset.pushData({
                    url: request.url,
                    html: mdDoc
                });
            },
        });
        // Run the crawler with initial request
        await crawler.run(this.urls);
    }
    async loadContent() {
        return await Dataset.open();
    }
}
//# sourceMappingURL=Crawler.js.map