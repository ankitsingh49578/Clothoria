import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // registeration logic
    // check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // else create new user
    user = new User({ name, email, password });
    await user.save();

    // create a jwt payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };
    // sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;

        // send the user and token in the response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // find the user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    // check if the password is correct (matchPassword is a method in the User model)
    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // create a jwt payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };
    // sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;

        // send the user and token in the response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};



export { registerUser, loginUser };
