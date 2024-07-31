import express, { NextFunction, Request, Response } from 'express';
import  { CatalogueService }  from '../service/catalogue.service';
import { CatalogueRepository } from '../repository/catalogue.repository';
import {RequestValidator} from '../utils/requestValidator'
import { CreateProductRequest, UpdateProductRequest } from '../dto/product.dto';
const router = express.Router();

export const catalogueService = new CatalogueService(new CatalogueRepository());

router.post(
    "/products", 
    async(req: Request, res: Response, next: NextFunction)=>{
        const {errors, input } = await RequestValidator(
                CreateProductRequest,
                req.body
            );
        if(errors) return res.status(400).json(errors)
        try{
            const data = await catalogueService.createProduct(input);
            return res.status(201).json(data);
        }catch(error){
            next(error)
        }
    }
)

router.patch(
    "/products/:id", 
    async(req: Request, res: Response, next: NextFunction)=>{
        const {errors, input } = await RequestValidator(
                UpdateProductRequest,
                req.body
        );
        const id = parseInt(req.params.id)||0;

        if(errors) return res.status(400).json(errors)
        try{
            const data = await catalogueService.updateProduct({id, ...input});
            return res.status(200).json(data);
        }catch(error){
            next(error)
        }
    }
)

router.get(
    "/products/:id", 
    async(req: Request, res: Response, next: NextFunction)=>{
        try{
            const id = parseInt(req.params.id);
            const data = await catalogueService.getProduct(id);
            return res.status(200).json(data);
        }catch(error){
            next(error)
        }
    }
)

router.get(
    "/products", 
    async(req: Request, res: Response, next: NextFunction)=>{
        
        const limit =Number(req.query["limit"])||10;
        const offset =Number(req.query["offset"])||0;

        try{
            const data = await catalogueService.getProducts(limit,offset);
            return res.status(200).json(data);
        }catch(error){
            next(error)
        }
    }
)

router.delete(
    "/products/:id", 
    async(req: Request, res: Response, next: NextFunction)=>{
        try{
            const id = parseInt(req.params.id)||0;
            const data = await catalogueService.deleteProduct(id);
            return res.status(200).json(data);
        }catch(error){
            next(error)
        }
    }
)

export default router;