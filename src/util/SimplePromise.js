export class SimplePromise {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    resolve (data) {
        this._resolve(data);
    };

    reject(data) {
        this._reject(data);
    };
}
