import { pgTable, timestamp, serial,integer, varchar } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
export const carts = pgTable("carts", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
})

export type Cart = InferSelectModel<typeof carts>;
export type NewCart = InferInsertModel<typeof carts>;

export const cartLineItems = pgTable("cart_line_items",{
    cartId: integer("cart_id")
    .references(()=> carts.id, {onDelete: 'cascade'})
    .notNull(),
    id: serial('id'),
    productId: integer('product_id'),
    itemName: varchar("item_name").notNull(), 
    variant : varchar('variant'),
    quantity: varchar('quantity'),
    price: integer('amount'),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
})
export type CartLineItem = InferSelectModel<typeof cartLineItems>;

export const cartRelations = relations(carts, ({ many }) => ({
  lineItems: many(cartLineItems),
}));

export const lineItemsRelations = relations(cartLineItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartLineItems.cartId],
    references: [carts.id],
  }),
}))