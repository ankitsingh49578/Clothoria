import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import main from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productAdminRoutes from "./routes/productAdminRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
configDotenv();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1); // Exit process with failure
  });

app.get("/", (req, res) => {
  res.send("welcome to the world");
});

// Define routes
// user routes
app.use("/api/users", userRoutes);
// product routes
app.use("/api/products", productRoutes);
// cart routes
app.use("/api/cart", cartRoutes);
// checkout routes
app.use("/api/checkout", checkoutRoutes);
// order routes
app.use("/api/orders", orderRoutes);
// upload routes
app.use("/api/upload", uploadRoutes);
// admin routes
app.use("/api/admin/users", adminRoutes);
// adminProducts routes
app.use("/api/admin/products", productAdminRoutes);
// adminOrders routes
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
