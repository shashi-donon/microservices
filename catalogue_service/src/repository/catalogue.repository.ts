import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogueRepositoryInterface";
import { Product } from "../models/product.model";
import { NotFoundError } from "../utils/error/error";

export class CatalogueRepository implements ICatalogRepository{

    prisma: PrismaClient
    constructor(){
        this.prisma = new PrismaClient();
    }

    async create(data: Product): Promise<Product> {
        return await this.prisma.product.create({data}) 
    }

    async update(data: Product): Promise<Product> {
        return await this.prisma.product.update({
            where: {id: data.id},
            data
        })
    }

    async delete(id: any): Promise<Product> {
        return this.prisma.product.delete({
            where: {id}
        })  
    }

    async find(limit: number, offset:number): Promise<Product[]> {
        return await this.prisma.product.findMany({
            take: limit,
            skip: offset
        })       
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.prisma.product.findFirst({
            where:{id}
        })     
        if(product){
            return Promise.resolve(product)
        }else{
            throw new NotFoundError("Product Not found")
        }
    }

}