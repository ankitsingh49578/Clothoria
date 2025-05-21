import Product from "../models/Product.js";

// Show all products
const showProducts = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // filter logic
    if (collection && collection.toLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }
    if (color) {
      query.color = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }
    // fetch products and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("server Error");
  }
};

// Show a single product
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      return res.json(product);
    } else return res.status(404).json({ message: "Product Not Found!" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error!");
  }
};

// Show similar products
const similarProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found!" });
    }
    const simProducts = await Product.find({
      _id: { $ne: id }, // exclude the current product ID
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(simProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
};

// Show Best seller product
const bestSeller = async (req, res) => {
  try {
    const bestSellerItem = await Product.findOne().sort({ rating: -1 }); // sorts documents in descending order by rating So highest rating comes first
    if (bestSellerItem) {
      res.json(bestSellerItem);
    } else res.status(404).json({ message: "No best seller found" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
};

// Show New arrival products
const newArrivals = async (req, res) => {
  try {
    // fetch latest 7-8 products from DB
    const newArrivalsProducts = await Product.find()
      .sort({ createdAt: -1 }) //Sorts the products by createdAt field in descending order (newest first)
      .limit(8);
    res.json(newArrivalsProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weigth,
      sku,
    } = req.body;

    const product = new Product({
      name,
      price,
      description,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weigth,
      sku,
      user: req.user._id, // reference to the admin user who created it
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;
    // find product by id
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.images = images || product.images;
      product.gender = gender || product.gender;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      await product.deleteOne();
      res.status(200).json({
        message: "Product deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

export {
  showProducts,
  singleProduct,
  similarProducts,
  bestSeller,
  newArrivals,
  createProduct,
  updateProduct,
  deleteProduct,
};
