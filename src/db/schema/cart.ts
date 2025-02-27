import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import user from "./users";
import product from "./products";

const cart = pgTable('cart', {
    id: serial("id").primaryKey(),
    buyerId: integer("buyer_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
    productId: integer("product_id").references(() => product.id, { onDelete: "cascade" }).notNull(),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

export default cart;