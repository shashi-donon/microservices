import { Type, Static } from "@sinclair/typebox"

export const CartRequestSchema = Type.Object({
    productId : Type.Integer(),
    customerId: Type.Integer(),
    quantity: Type.Integer()
})

export type CartRequestInput = Static<typeof CartRequestSchema>

export const EditRequestSchema = Type.Object({
    customerId: Type.Integer(),
    quantity: Type.Integer()
})

export type EditRequestInput = Static<typeof EditRequestSchema>