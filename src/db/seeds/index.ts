import { seedUsers } from "./users";
import { seedProducts } from "./products";

async function runSeeds() {
  try {
    await seedUsers();
    await seedProducts();

    console.log("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

runSeeds();
