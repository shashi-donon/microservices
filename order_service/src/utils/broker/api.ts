import axios from 'axios';
import { APIError } from '../error/error';
import { logger } from '../logger/logger';
import { Product } from '../../dto/product.dto';
const CATALOG_URL = process.env.CATALOG_URL||'http://localhost:5000';

export const getProductDetails=async (productId:number): Promise<Product>=>{
    try {
        const response =await axios.get(`${CATALOG_URL}/products/${productId}`);
        const product = response.data as Product;
        return product;
    } catch (error) {
        logger.error(error)
        throw new APIError()
    }
}