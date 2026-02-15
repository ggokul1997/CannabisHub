# Cannabis Product Discovery Platform - Backend

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation Steps

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create/update `.env` file in the backend directory
   - Add your MongoDB URI and JWT secret:
     ```
  
     PORT=5000
     NODE_ENV=development
     ```

4. **Seed dummy data (optional):**
   ```bash
   node seed.js
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)
- **POST** `/register` - Register a new user
- **POST** `/login` - Login user and get JWT token
- **GET** `/profile` - Get current user profile (requires auth)

### Product Routes (`/api/products`)
- **GET** `/` - Get all products (supports filtering & search)
  - Query params: `category`, `minTHC`, `maxTHC`, `search`
- **GET** `/:id` - Get product by ID
- **POST** `/` - Create new product (admin only)
- **PUT** `/:id` - Update product (admin only)
- **DELETE** `/:id` - Delete product (admin only)

### Wishlist Routes (`/api/wishlist`)
- **POST** `/` - Add product to wishlist (requires auth)
- **GET** `/` - Get user's wishlist (requires auth)
- **DELETE** `/:productId` - Remove product from wishlist (requires auth)
- **GET** `/status/:productId` - Check if product is in wishlist (requires auth)

## Database Models

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed),
  role: String ('user' or 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  category: String ('Flower', 'Edibles', 'Oils'),
  thc: Number (0-100),
  cbd: Number (0-100),
  price: Number,
  image: String,
  effects: Array,
  usageType: String,
  stock: Number,
  createdBy: ObjectId (User reference),
  createdAt: Date,
  updatedAt: Date
}
```

### Wishlist Model
```javascript
{
  userId: ObjectId (User reference),
  productId: ObjectId (Product reference),
  createdAt: Date
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Sample Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "email": "john@example.com", "password": "password123"}'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Filter Products by Category
```bash
curl "http://localhost:5000/api/products?category=Flower"
```

### Filter by THC Range
```bash
curl "http://localhost:5000/api/products?minTHC=20&maxTHC=25"
```

### Search Products
```bash
curl "http://localhost:5000/api/products?search=Kush"
```

### Create Product (Admin Only)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "New Product",
    "description": "Description",
    "category": "Flower",
    "thc": 20,
    "cbd": 1,
    "price": 12.99,
    "effects": ["Relaxed"],
    "usageType": "Smoking"
  }'
```

### Add to Wishlist
```bash
curl -X POST http://localhost:5000/api/wishlist \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"productId": "<product_id>"}'
```

## Features

✅ User authentication with JWT
✅ Role-based access control (Admin/User)
✅ Product CRUD operations
✅ Advanced product filtering (category, THC range, search)
✅ Per-user wishlist management
✅ MongoDB with Mongoose ODM
✅ Input validation & error handling
✅ Clean folder structure
✅ 20 dummy products across 3 categories

## Deployment

This backend is configured for deployment on **Render**:

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy with one click

## Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Role-based middleware prevents unauthorized access
- Input validation on all endpoints
- CORS enabled for frontend communication

## Future Improvements

- Add pagination to product listings
- Implement product reviews
- Add order management system
- Email verification
- Password reset functionality
