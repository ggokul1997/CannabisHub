# Cannabis Product Discovery Platform - Frontend

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Ensure `.env` file exists with:
     ```
     VITE_API_BASE_URL=http://localhost:5000/api
     ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Navigation bar with auth links
│   ├── Footer.jsx           # Footer component
│   ├── ProductCard.jsx      # Reusable product card component
│   ├── FilterSection.jsx    # Product filters (category, THC, search)
│   └── LoadingError.jsx     # Loading spinner & error components
├── screens/
│   ├── ProductListPage.jsx  # Main products list with filtering
│   ├── ProductDetailPage.jsx # Individual product details
│   ├── WishlistPage.jsx     # User's wishlist
│   ├── LoginPage.jsx        # Login form
│   ├── RegisterPage.jsx     # Registration form
│   └── AdminPage.jsx        # Admin panel for adding products
├── slices/
│   ├── authSlice.js         # Redux auth state management
│   ├── productSlice.js      # Redux products state management
│   └── wishlistSlice.js     # Redux wishlist state management
├── utils/
│   └── api.js               # API client and endpoints
├── store.js                 # Redux store configuration
├── App.jsx                  # Main app component with routing
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **React Bootstrap** - UI components
- **React Icons** - Icon library
- **Axios** - HTTP client

## Features

✅ Product listing with filtering & search
✅ Advanced filters (category, THC range, search by name)
✅ Product detail page with full information
✅ User authentication (login/register)
✅ JWT token-based auth
✅ Per-user wishlist
✅ Admin panel for adding products
✅ Responsive design (desktop priority)
✅ Redux state management
✅ Error handling & loading states

## Key Components

### Header Component
- Navigation bar with logo
- Auth links (login, register, logout)
- Wishlist icon with item count
- User greeting when logged in

### ProductCard Component
- Product image, name, category
- THC/CBD percentages
- Price and effects
- Wishlist button (heart icon)
- Link to product details

### FilterSection Component
- Category dropdown (Flower, Edibles, Oils)
- THC range slider
- Product name search
- Clear filters button

### Product Screens
- **ProductListPage**: Displays all products with filters
- **ProductDetailPage**: Shows full product info with wishlist toggle
- **WishlistPage**: User's saved products
- **LoginPage**: Email/password authentication
- **RegisterPage**: New user registration
- **AdminPage**: Admin-only product creation form

## Redux State Management

### Auth Slice
```javascript
{
  user: { id, username, email, role },
  token: JWT token,
  loading: boolean,
  error: string
}
```

### Product Slice
```javascript
{
  products: [],
  product: null,
  loading: boolean,
  error: string,
  filters: { category, minTHC, maxTHC, search }
}
```

### Wishlist Slice
```javascript
{
  wishlists: [],
  loading: boolean,
  error: string
}
```

## API Integration

The app connects to backend API at `http://localhost:5000/api`:

- **Auth**: `/auth/register`, `/auth/login`, `/auth/profile`
- **Products**: `/products`, `/products/:id`, `/products` (POST, PUT, DELETE for admin)
- **Wishlist**: `/wishlist`, `/wishlist/:productId`, `/wishlist/status/:productId`

## Styling

- Custom CSS variables for consistent theming
- Bootstrap 5 for component styling
- Responsive grid layout (xs, sm, md, lg breakpoints)
- Cannabis-themed color palette (#2d5016 primary, #6ba829 secondary)

## Build & Deployment

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Deploy to Vercel:
1. Push code to GitHub
2. Connect repo to Vercel
3. Vercel auto-detects Vite and builds
4. Set `VITE_API_BASE_URL` in Vercel environment variables
5. Deploy with one click

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000/api` |

## Future Enhancements

- Shopping cart functionality
- Order placement and tracking
- Product reviews and ratings
- Advanced sorting (price, popularity)
- Product comparison feature
- User profile and order history
- Payment integration
- Email notifications
