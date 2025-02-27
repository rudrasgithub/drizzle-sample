import { pgTable, serial, integer, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { user } from '.';

const product = pgTable('products', {
    id: serial("id").primaryKey(),
    sellerId: integer("seller_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: integer("price").notNull(),
    stockQuantity: integer("stock_quantity").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

export default product;