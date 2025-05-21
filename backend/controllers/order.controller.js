import Order from "../models/Order.js";

// GET request to Show all the orders for a logged-in user
const showAllOrders = async (req, res) => {
  try {
    // find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // sort by most recent orders
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET request to show a particular order details by ID
const showOrderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({ message: "Order Not Found!" });
    }
    // return the full order details
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export { showAllOrders, showOrderDetail };
