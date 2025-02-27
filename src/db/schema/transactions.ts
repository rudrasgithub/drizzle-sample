import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { paymentMethodEnum, transactionStatusEnum } from "./enums";
import order from "./order";

const transaction = pgTable('transactions', {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").references(() => order.id, { onDelete: "cascade" }).notNull(),
    amount: integer("amount").notNull(),
    status: transactionStatusEnum("status").notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),  // 'credit card', 'paypal', etc.
    transactionDate: timestamp("transaction_date").defaultNow(),
});
export default transaction;