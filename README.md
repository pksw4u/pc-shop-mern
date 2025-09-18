# Computer Shop - Full Stack E-commerce Platform

A modern, full-stack e-commerce platform for computer hardware and PC building, featuring an interactive PC builder with compatibility checking, user authentication, payment processing, and comprehensive admin management.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/registration with JWT tokens
- **Product Catalog**: Browse products by categories (Laptops, Desktops, Components, Accessories)
- **Shopping Cart**: Add/remove products, persistent cart state
- **Checkout & Payments**: Integrated Razorpay payment gateway
- **Order Management**: Track orders, order history, status updates

### PC Building Tool
- **Interactive Builder**: Select compatible PC components
- **Compatibility Checking**: Real-time validation of component compatibility
- **Build Suggestions**: AI-powered recommendations based on budget and category
- **Component Categories**: CPU, Motherboard, RAM, GPU, Storage, Power Supply, Case, CPU Cooler

### Admin Dashboard
- **Product Management**: CRUD operations for products and categories
- **Order Management**: View and update order statuses
- **Customer Management**: User profiles and order history
- **Inventory Tracking**: Stock management and low-stock alerts
- **Reports**: Sales analytics and performance metrics

### Additional Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Theme switching capability
- **Search & Filtering**: Advanced product search and filtering
- **Wishlist**: Save favorite products
- **Reviews & Ratings**: Customer feedback system

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Razorpay** - Payment processing
- **CORS** - Cross-origin resource sharing

### Frontend
- **Next.js 14** - React framework with SSR/SSG
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hook Form** - Form handling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd computer-shop
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` files in both backend and frontend directories:

   **Backend (.env)**
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/computer-shop
   JWT_SECRET=your-jwt-secret-key
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   ```

   **Frontend (.env.local)**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

6. **Seed the database** (optional)
   ```bash
   cd backend
   npm run seed
   ```

## 🚀 Usage

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:3001

2. **Start the frontend application**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will run on http://localhost:3000

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### PC Building
- `GET /api/buildpc/categories` - Get PC component categories
- `GET /api/buildpc/suggestions` - Get build suggestions
- `POST /api/buildpc/check-compatibility` - Check component compatibility

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/products` - Admin product management
- `GET /api/admin/orders` - Admin order management
- `GET /api/admin/customers` - Admin customer management

## 🏗️ Project Structure

```
computer-shop/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and service configurations
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # Reusable React components
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service functions
│   │   ├── store/           # Redux store and slices
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions or support, please contact the development team.

---

**Happy Building! 🖥️⚡**