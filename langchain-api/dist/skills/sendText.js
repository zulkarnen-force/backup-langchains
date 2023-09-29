export class SendText {
    constructor(text) {
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.text = text;
    }
    async send() {
        return await this.text;
    }
}
//# sourceMappingURL=sendText.js.map