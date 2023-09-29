import { CheerioCrawler, Dataset, htmlToText } from 'crawlee';
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown'

export class Crawler{
    urls: string[] = [];
    constructor(urls: string[])
    {
        this.urls = urls;
    }
    async start(){
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

    async loadContent()
    {
        return await Dataset.open();
    }

}