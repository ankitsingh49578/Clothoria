import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";
import products from "./data/products.js";
import Cart from "./models/Cart.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const importData = async () => {
  try {
    // clearing existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // creating admin user
    const createdUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });
    // assign the default user ID to the product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // inserting sample products into the database
    await Product.insertMany(sampleProducts);

    console.log("products imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1); // Exit with failure
  }
};

importData();
