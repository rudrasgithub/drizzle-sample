import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import order from "./order";
import product from "./products";

const OrderItem = pgTable('order_items', {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").references(() => order.id, { onDelete: "cascade" }).notNull(),
    productId: integer("product_id").references(() => product.id, { onDelete: "cascade" }).notNull(),
    quantity: integer("quantity").notNull(),
    unitPrice: integer("unit_price").notNull(),
    totalPrice: integer("total_price").notNull(),
});

export default OrderItem