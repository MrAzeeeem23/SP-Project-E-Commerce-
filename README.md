# SP-Project-E-Commerce-

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js) and modern frontend tools. This project provides a complete platform for users to browse products, manage shopping carts, and place orders, while offering a robust admin experience for managing products and orders.

---

## 🚀 Features

- **User Authentication:** Secure JWT-based sign up, login, and session management.
- **Product Listing & Search:** Browse and search products with filter and sort options.
- **Shopping Cart:** Add, update, and remove products in a persistent cart.
- **Order Management:** Place orders, view order history, and manage delivery status.
- **Responsive Design:** Mobile-first UI with sleek and modern styling.
- **Admin Panel:** (If implemented) Manage products, orders, and users.

---

## 🛠️ Technologies Used

### Frontend

- [Vite](https://vitejs.dev/) (build tool)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/) (state management)

### Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (database)
- [JWT](https://jwt.io/) (authentication)

---

## 📦 Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/MrAzeeeem23/SP-Project-E-Commerce-.git
    cd SP-Project-E-Commerce-
    ```

2. **Install dependencies for both backend and frontend:**
    ```bash
    # Backend dependencies
    npm install

    # Frontend dependencies
    cd frontend
    npm install
    cd ..
    ```

3. **Environment Variables:**
    - Create a `.env` file in the root and backend directories.
    - Add your MongoDB URI, JWT secret, and other required variables.

4. **Run the application:**
    ```bash
    # In the root directory
    npm run dev

    # Or run backend and frontend separately:
    # Backend
    npm start

    # Frontend (in /frontend)
    cd frontend
    npm run dev
    ```

---

## 📁 Project Structure

```
/
├── backend/        # Express API and server logic
├── frontend/       # React client app (Vite, Tailwind)
├── models/         # Mongoose data models
├── routes/         # API endpoints
├── controllers/    # Business logic
├── middleware/     # Express middlewares
├── public/         # Static assets
└── README.md
```

---

## 💡 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## 📄 License

This project is for educational purposes and may use a custom license. Please check the LICENSE file for details.

---

## 🙋‍♂️ Author

**Azeem**  
[GitHub Profile](https://github.com/MrAzeeeem23)

---
