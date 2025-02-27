import { db } from "../../config/db";
import { user } from "../schema";
import { userRoleEnum } from "../schema/enums";
import userData from './data/users.json';

export async function seedUsers() {
  console.log("Seeding users...");
  try {
    const formattedUsers = userData.map(user => ({
      ...user,
      role: user.role as (typeof userRoleEnum.enumValues)[number],
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt)
    }))
  
    await db.insert(user).values(formattedUsers);
    console.log("Users seeded!");

  } catch (err) {
    throw new Error("err while seeing" + err)
  }
}
