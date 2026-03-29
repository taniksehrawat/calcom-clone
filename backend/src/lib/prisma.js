const { PrismaClient } = require("@prisma/client");

// Create a single Prisma instance
const prisma = new PrismaClient();

module.exports = prisma;