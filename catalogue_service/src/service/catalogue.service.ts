import { ICatalogRepository } from "../interface/catalogueRepositoryInterface";
import { NotFoundError } from "../utils/error/error";

export class CatalogueService {

    private repository: ICatalogRepository;
    
    constructor(repository: ICatalogRepository){
        this.repository = repository
    }
    async createProduct(input: any){
        const data = await this.repository.create(input);
        return data;
    }

    async updateProduct(input:any){
        const data = await this.repository.update(input);
        return data;
        //emit evennt to elastic 
    }

    //elastic search
    async getProducts(limit:number, offset:number){
        const products = await this.repository.find(limit, offset);
        return products
    }

    async getProduct(id:number){
        const product = await this.repository.findOne(id);
        return product;
    }

    async deleteProduct(id:number){
        const product = await this.repository.delete(id);
        return product;
    }
}