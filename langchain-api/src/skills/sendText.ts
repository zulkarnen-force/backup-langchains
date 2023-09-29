
export class SendText {
    text: string;
    constructor(text: string){
        this.text = text;
    }
    async send()
    {
        return await this.text;
    }
}