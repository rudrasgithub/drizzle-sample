import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core';
import { user } from '.';
import { orderStatusEnum } from './enums';


const order = pgTable('orders', {
    id: serial("id").primaryKey(),
    buyerId: integer("buyer_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
    totalAmount: integer("total_amount").notNull(),
    status: orderStatusEnum("status").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

export default order;