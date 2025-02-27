import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["buyer", "seller"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "shipped", "delivered", "canceled"]);
export const transactionStatusEnum = pgEnum("transaction_status", ["pending", "completed", "failed"]);
export const paymentMethodEnum = pgEnum("payment_method", ["paypal", "credit_card", "debit_card", "upi", "razorpay"]);
