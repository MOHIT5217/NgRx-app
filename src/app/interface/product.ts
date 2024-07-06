export class Product {
    constructor(
        public name: string,
        public price: number,
        public id?: number,
    ){}

    getPriceFormat(){
        return `$${this.price.toFixed(2)}`;
    }
}
