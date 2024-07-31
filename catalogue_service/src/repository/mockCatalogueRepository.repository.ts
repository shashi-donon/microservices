import { ICatalogRepository } from "../interface/catalogueRepositoryInterface";
import { Product } from "../models/product.model";

export class MockCatalogueRepository implements ICatalogRepository {
    create(_data: Product): Promise<Product> {
        const mockProduct ={
            id: 1,
            ..._data
        } as Product;
        return Promise.resolve(mockProduct);
    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data as Product)
    }
    delete(id: any): Promise<Product> {
        return Promise.resolve({id} as Product)
    }
    find(_limit: number, _offset: number): Promise<Product[]> {
        return Promise.resolve([])
    }
    findOne(): Promise<Product> {
        return Promise.resolve({}as Product)
    }

}