import { NextFunction, Request, Response } from "express";
import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { product } from "../db/schema";

export const AddItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, sellerId, description, price, stockQuantity } = req.body;

        const newItem = await db.insert(product).values({ name, sellerId, description, price, stockQuantity }).returning({
            id: product.id
        });

        res.status(201).json(newItem);
    } catch (err) {
        next(err);
    }
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);

        await db.delete(product).where(eq(product.id, id));

        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        next(err);
    }
}