export class Product {
    constructor(
        public id: number,
        public name: string,
        public company: string,
        public price: number,
        public isShow: boolean,
        public createDate: Date,
        public modifyDate?: Date
    ) { }

    setDisplay(isShow: boolean){
        this.isShow = isShow;
    }
}