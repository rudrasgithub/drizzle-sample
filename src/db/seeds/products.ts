import { db } from "../../config/db";
import { product } from "../schema";
import productData from './data/products.json';

export async function seedProducts() {
  console.log("Seeding products...");
  try {
    const formattedUsers = productData.map(product => ({
      ...product,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt)
    }))
  
    await db.insert(product).values(formattedUsers);
    console.log("Users seeded!");

  } catch (err) {
    throw new Error("err while seeing" + err)
  }
}

