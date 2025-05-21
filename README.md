# 🛍️ E-Commerce Clothing Website

A fully functional MERN stack (MongoDB, Express.js, React.js, Node.js) e-commerce platform focused on selling clothes. It features user authentication, admin management, product filtering, cart operations, and responsive design.

## 🚀 Live Demo: (https://e-commerceclothoria.vercel.app/)

---

## 🧰 Tech Stack

### Frontend

- React.js
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Token (JWT) for authentication
- bcryptjs for password hashing
- dotenv for environment variables

---

## 🔐 Features

### ✅ User

- Register/Login
- View clothing products
- Add to cart
- Checkout simulation
- Update profile

### 🛠️ Admin

- Add/update/delete users
- Update user roles (Admin/Customer)
- Product management (add/edit/delete)

---

## 📁 Project Structure

```bash
📦 client
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂pages
 ┃ ┣ 📂redux
 ┃ ┗ App.jsx, index.js, etc.

📦 server
 ┣ 📂controllers
 ┣ 📂routes
 ┣ 📂models
 ┣ 📂middlewares
 ┗ server.js, .env, etc.
