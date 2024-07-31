import  { CartRepositoryType } from "../types/repository.types"
import * as Repository from "../repository/cart.repository";
import { CreateCart } from "./cart.service";

describe("cart service test ",()=>{
    let repo: CartRepositoryType;

    beforeEach(()=>{
        repo=Repository.CartRepository;
    })

    afterEach(()=>{
        repo={} as CartRepositoryType;
    })

    it("should return correct data while creating cart", async ()=>{
        const mockCart = {
            title: "smartphone",
            amount: 1200
        }
        jest.spyOn(Repository.CartRepository, "create")
        .mockImplementationOnce(()=>{
            return Promise.resolve({
                message: "fake response from cart repo",
                input:mockCart
            })
        })
        const result = await CreateCart(mockCart, repo);
        expect(result).toEqual({
            message: "fake response from cart repo",
            input: mockCart
        })
    })


})