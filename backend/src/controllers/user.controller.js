const prisma = require("../lib/prisma");

// Create new user
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required",
      });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    // Handle duplicate email
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports = { createUser };