import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Remove whitespace
      match: [/.+@.+\..+/, "Please fill a valid email address"], // Email format validation
      lowercase: true, // Convert to lowercase
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer", // Default role is customer
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash password before saving the user to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password is not modified, skip hashing
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed to save the user
});

// Method to compare password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
};

const User = mongoose.model("User", userSchema); // Create User model

export default User; // Export User model
