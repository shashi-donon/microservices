import { ICatalogRepository } from "../../interface/catalogueRepositoryInterface"
import { Product } from "../../models/product.model";
import { MockCatalogueRepository } from "../../repository/mockCatalogueRepository.repository";
import { CatalogueService } from "../catalogue.service";
import { faker } from '@faker-js/faker';
import { ProductFactory } from "../../utils/fixtures";
const mockProduct = (rest)=>{
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min:0, max:100}),
        ...rest
    }
}

describe("Catalogue Service Test Case", ()=>{

    let repository: ICatalogRepository;
    beforeEach(()=>{
        repository = new MockCatalogueRepository();
    })

    afterEach(()=>{})

    describe("Create Product",()=>{
        test("should create product",async ()=>{
            const service = new CatalogueService(repository);
            const requestBody = mockProduct({
                price: +faker.commerce.price()
            });
            const result = await service.createProduct(requestBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number)
            })
        })

        test("should throw an error if unable to create product", async()=>{
            const service = new CatalogueService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            })
            jest.spyOn(repository,'create')
            .mockImplementationOnce(()=>{ return Promise.resolve({}as Product)});
            
            await expect(service.createProduct(reqBody)).rejects.toThrow(
                "unable to add product"
            )
    
        })

        test("throw an error if product already exists", async()=>{
            const service = new CatalogueService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            })
            jest.spyOn(repository,'create')
            .mockImplementationOnce(()=>{ return Promise.reject(new Error("product already exists"))});
            
            await expect(service.createProduct(reqBody)).rejects.toThrow(
                "product already exists"
            )
    
        })
    })

    describe("Update Product",()=>{
        test("should update product",async ()=>{
            const service = new CatalogueService(repository);
            const requestBody = mockProduct({
                price: +faker.commerce.price(),
                id: faker.number.int({min:0, max:100})
            });
            const result = await service.updateProduct(requestBody);
            expect(result).toMatchObject(requestBody)
        })

        test("should throw an error if unable to update product", async()=>{
            const service = new CatalogueService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            })
            jest.spyOn(repository,'update')
            .mockImplementationOnce(()=>{ return Promise.resolve({}as Product)});
            
            await expect(service.updateProduct(reqBody)).rejects.toThrow(
                "unable to update product"
            )
    
        })

        test("throw an error if product already exists", async ()=>{
            const service = new CatalogueService(repository);
            
            jest.spyOn(repository,'update')
            .mockImplementationOnce(()=>{ return Promise.reject(new Error("error while updating product"))});
            
            await expect(service.updateProduct({})).rejects.toThrow(
                "error while updating product"
            )
    
        })
    })

    describe("get Products",()=>{
        test("should get products by offset and limit",async ()=>{
            const service = new CatalogueService(repository);
            const randomLimit = faker.number.int({min:0, max:50})

            const products = ProductFactory.buildList(randomLimit)

            jest.spyOn(repository, "find").mockImplementationOnce(()=>{
                return Promise.resolve(products)
            })

            const result = await service.getProducts(randomLimit, 0)

            expect(result.length).toBe(randomLimit);
            expect(result).toMatchObject(products)
        })

        test("unable to find products", async()=>{
            const service = new CatalogueService(repository);
            const randomLimit = faker.number.int({min:0, max:50})
            jest.spyOn(repository, "find").mockImplementationOnce(()=>{
                return Promise.reject(new Error("Products doesn't exists"))
            })
            
            await expect(service.getProducts(randomLimit,0)).rejects.toThrow(
                "Products doesn't exists"
            )
        })      
        
        test("unable to find products", async()=>{
            const service = new CatalogueService(repository);
            const randomLimit = faker.number.int({min:0, max:50})
            jest.spyOn(repository, "find").mockImplementationOnce(()=>{
                return Promise.resolve([])
            })
            
            await expect(service.getProducts(randomLimit,0)).rejects.toThrow(
                "Products doesn't exists"
            )
        }) 
    })

    describe("get Product",()=>{
        test("should get products by offset and limit",async ()=>{
            const service = new CatalogueService(repository);
            const id = faker.number.int({min:0, max:50})
            const product = ProductFactory.build()

            jest.spyOn(repository, "findOne").mockImplementationOnce(()=>{
                return Promise.resolve(product)
            })

            const result = await service.getProduct(id)
            expect(result).toMatchObject(product)
        })

        test("unable to find products", async()=>{
            const service = new CatalogueService(repository);
            const product = ProductFactory.build()
            jest.spyOn(repository, "findOne").mockImplementationOnce(()=>{
                return Promise.reject(new Error("Unable to find product"))
            })
            
            await expect(service.getProduct(product.id)).rejects.toThrow(
                "Unable to find product"
            )
        })      
        
        test("unable to find product", async()=>{
            const service = new CatalogueService(repository);
            const product = ProductFactory.build()
            const randomLimit = faker.number.int({min:0, max:50})
            jest.spyOn(repository, "findOne").mockImplementationOnce(()=>{
                return Promise.resolve({} as Product)
            })
            
            await expect(service.getProduct(randomLimit)).rejects.toThrow(
                "Product not found"
            )
        }) 
    })

    describe("delete Product",()=>{
        test("should delete a product",async ()=>{
            const service = new CatalogueService(repository);
            const product = ProductFactory.build()

            jest.spyOn(repository, "delete").mockImplementationOnce(()=>{
                return Promise.resolve({id: product.id}as Product)
            })

            const result = await service.deleteProduct(product.id)
            expect(result.id).toBe(product.id)
        })

        test("should throw error when repository has error", async()=>{
            const service = new CatalogueService(repository);
            const product = ProductFactory.build();
            jest.spyOn(repository, "delete").mockImplementationOnce(()=>{
                return Promise.reject(new Error("failed to delete product"))
            })
            
            await expect(service.deleteProduct(product.id)).rejects.toThrow(
                "failed to delete product"
            )
        })      
        
        test("unable to find products", async()=>{
            const service = new CatalogueService(repository);
            const product = ProductFactory.build()
            jest.spyOn(repository, "delete").mockImplementationOnce(()=>{
                return Promise.resolve({} as Product)
            })
            
            await expect(service.deleteProduct(product.id)).rejects.toThrow(
                "Product not found"
            )
        }) 
    })
})