export class ObjectData {

    constructor(index, type, totalNum) {
        this.index = index;
        this.type = type;
        this.totalNum = totalNum;
    }

    getType() {
        return this.type;
    }

    getTotalNum() {
        return this.totalNum;
    }

    getIndex() {
        return this.index;
    }

    getNextIndex() {
        return this.index < (this.totalNum - 1) ? this.index + 1 : 0;
    }

    setIndex(index) {
        this.index = index;
    }

    incIndex() {
        this.index = this.getNextIndex();
        return this.index;
    }
}
