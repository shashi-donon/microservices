export class Product{
    constructor(
        //in constructor we have to explicitly mention public
        public readonly name: string,
        public readonly description: string,
        public readonly stock: number,
        public readonly price: number,
        public readonly id?: number
    ){

    }
}