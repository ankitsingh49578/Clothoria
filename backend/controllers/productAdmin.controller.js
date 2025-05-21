import Product from "../models/Product.js";

// GET request to Show all products (only admin can give this request)
const showAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export { showAllProducts };
