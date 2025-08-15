// db-test.js
import prisma from './lib/prisma.js';

async function main() {
  console.log("[DB Test] Starting connection test...");

  try {
    // Try a simple query
    const users = await prisma.user.findMany({
      take: 1,
    });

    console.log("[DB Test] Connection successful!");
    console.log("[DB Test] Found users:", users);

  } catch (err) {
    console.error("[DB Test] Connection failed:", err);
  } finally {
    await prisma.$disconnect();
    console.log("[DB Test] Disconnected from DB");
  }
}

main();
