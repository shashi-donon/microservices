import { DB } from "../db/db.connection"
import { carts } from "../db/schema"
import {CartRepositoryType } from "../types/repository.types"

const createCart = async(input:any):Promise<any> =>{

    const result = await DB.insert(carts).values({
            customerId:input
        }).returning({cardId: carts.id})

    return Promise.resolve(result)
}
const findCart = async(_input:number):Promise<any> =>{
    const result = await DB.select().from(carts)
    return result
}
const updateCart = async(_input:any):Promise<any> =>{
    return Promise.resolve({})
}
const deleteCart = async(_input:any):Promise<any> =>{
    return Promise.resolve({})
}

export const CartRepository: CartRepositoryType = {
    create: createCart,
    find: findCart,
    update:updateCart,
    delete: deleteCart
}