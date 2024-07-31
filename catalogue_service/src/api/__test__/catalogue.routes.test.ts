import request from "supertest";
import express from "express";
import {faker} from "@faker-js/faker"
import catalogueRouter from "../catalogue.routes";
import {catalogueService} from '../catalogue.routes';
import { ProductFactory } from "../../utils/fixtures";

const app = express();
app.use(express.json())

app.use("/", catalogueRouter)

const mockRequest = ()=>{
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min:0, max:100}),
        price: faker.number.int({min:0, max:50})
    }
}

describe("Catalogue Routes", ()=>{
    describe("POST /products",()=>{
        test("should create a product successfully",async ()=>{
            
            const requestBody = mockRequest();
            const product = ProductFactory.build()

            jest.spyOn(catalogueService,'createProduct')
            .mockImplementationOnce(()=> Promise.resolve(product))

            const response = await request(app)
                .post("/products")
                .send(requestBody)
                .set("Accept", "application/json")

            expect(response.status).toBe(201)
            expect(response.body).toEqual(product)
        })

        test("product creation failed",async ()=>{
            const requestBody = mockRequest();

            const response = await request(app)
                .post("/products")
                .send({...requestBody, name:""})
                .set("Accept", "application/json")

            expect(response.status).toBe(400)
            expect(response.body).toEqual("name should not be empty")
        })

        test("should respond with an internal server error",async ()=>{
            const requestBody = mockRequest();
            jest.spyOn(catalogueService, 'createProduct')
            .mockImplementationOnce(()=>Promise.reject(new Error("Unable to Create Product")))
            const response = await request(app)
                .post("/products")
                .send(requestBody)
                .set("Accept", "application/json")

            expect(response.status).toBe(500)
            expect(response.body).toEqual("Unable to Create Product")
        })
    })

    describe("PATCH /product/:id",()=>{
        test("should update a product successfully",async ()=>{            
            const product = ProductFactory.build()
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock
            }
            jest.spyOn(catalogueService,'updateProduct')
            .mockImplementationOnce(()=> Promise.resolve(product))

            const response = await request(app)
                .patch(`/products/${product.id}`)
                .send(requestBody)
                .set("Accept", "application/json")

            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)
        })

        test("product creation failed",async ()=>{
            const product = ProductFactory.build()
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock
            }
            const response = await request(app)
                .patch(`/products/${product.id}`)
                .send({...requestBody, price:-1})
                .set("Accept", "application/json")

            expect(response.status).toBe(400)
            expect(response.body).toEqual("price must not be less than 1")
        })

        test("should respond with an internal server error",async ()=>{
            const product = ProductFactory.build()
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock
            }
            jest.spyOn(catalogueService, 'updateProduct')
            .mockImplementationOnce(()=>Promise.reject(new Error("error occured on server")))
            const response = await request(app)
                .patch(`/products/${product.id}`)
                .send(requestBody)
                .set("Accept", "application/json")

            expect(response.status).toBe(500)
            expect(response.body).toEqual("error occured on server")
        })
    })

    describe("GET /products",()=>{
        test("should get a products successfully",async ()=>{  
            const randomLimit = faker.number.int({min:0, max:50})          
            const products = ProductFactory.buildList(randomLimit)
            jest.spyOn(catalogueService,'getProducts')
            .mockImplementationOnce(()=> Promise.resolve(products))

            const response = await request(app)
                .get(`/products?limit=${randomLimit}&offset=0`)
                .send()
                .set("Accept", "application/json")

            expect(response.status).toBe(200)
            expect(response.body).toEqual(products)
        })
        test("should respond with an internal server error",async ()=>{
            const product = ProductFactory.build()
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock
            }
            jest.spyOn(catalogueService, 'getProducts')
            .mockImplementationOnce(()=>Promise.reject(new Error("error occured on server")))
            const response = await request(app)
                .get(`/products`)
                .send()
                .set("Accept", "application/json")

            expect(response.status).toBe(500)
            expect(response.body).toEqual("error occured on server")
        })
    })

    describe("GET /products/:id",()=>{
        test("should get product successfully",async ()=>{            
            const product = ProductFactory.build()
            jest.spyOn(catalogueService,'getProduct')
            .mockImplementationOnce(()=> Promise.resolve(product))

            const response = await request(app)
                .get(`/products/${product.id}`)
                .send()
                .set("Accept", "application/json")

            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)
        })

        test("should respond with an internal server error",async ()=>{
            const product = ProductFactory.build()
            jest.spyOn(catalogueService, 'getProduct')
            .mockImplementationOnce(()=>Promise.reject(new Error("error occured on server")))
            const response = await request(app)
                .get(`/products/${product.id}`)
                .send()
                .set("Accept", "application/json")

            expect(response.status).toBe(500)
            expect(response.body).toEqual("error occured on server")
        })
    })

    describe("DELETE /products/:id",()=>{
        test("should get product successfully",async ()=>{            
            const product = ProductFactory.build()
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock
            }
            jest.spyOn(catalogueService,'deleteProduct')
            .mockImplementationOnce(()=> Promise.resolve(product))

            const response = await request(app)
                .delete(`/products/${product.id}`)
                .send(requestBody)
                .set("Accept", "application/json")

            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)
        })

        test("should respond with an internal server error",async ()=>{
            const product = ProductFactory.build()
            jest.spyOn(catalogueService, 'deleteProduct')
            .mockImplementationOnce(()=>Promise.reject(new Error("error occured on server")))
            const response = await request(app)
                .delete(`/products/${product.id}`)
                .send()
                .set("Accept", "application/json")

            expect(response.status).toBe(500)
            expect(response.body).toEqual("error occured on server")
        })
    })
})
