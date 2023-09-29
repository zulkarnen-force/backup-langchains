import { Dataset } from 'crawlee';
export declare class Crawler {
    urls: string[];
    constructor(urls: string[]);
    start(): Promise<void>;
    loadContent(): Promise<Dataset<import("crawlee").Dictionary<any>>>;
}
