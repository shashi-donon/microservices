import { CartRequestInput, EditRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../types/repository.types"
import { getProductDetails } from '../utils/broker';
import { NotFoundError } from "../utils/error/error";
import { logger } from "../utils/logger/logger";

export const CreateCart = async (input:CartRequestInput, repo: CartRepositoryType) =>{
    const product = await getProductDetails(input.productId);
    logger.info(product)

    if(product.stock>input.quantity){
        throw new NotFoundError("Product Out Of Stock")
    }
    const data = await repo.create(input);
    return product;
}
export const GetCart = async (input:any, repo: CartRepositoryType) =>{
    const data = await repo.find(input);
    return data;
}

export const EditCart = async (input:EditRequestInput, repo: CartRepositoryType) =>{
    const data = await repo.update(input);

    return data;
}

export const DeleteCart = async (input:any, repo: CartRepositoryType) =>{
    const data = await repo.delete(input);
    return data;
}