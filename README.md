# Mini E-Commerce App

Hey there! This is a simple e-commerce app.

## What's Inside

### Frontend (React)
- Product listing with search and filters
- Shopping cart that updates in real-time
- Login page with JWT authentication

### Backend (Node.js)
- REST API with Express
- JWT authentication
- Product data
- Cart management

## Getting Started

### Backend Setup
First, let's get the server running:

```bash
cd backend
npm install
```

You'll need to create a `.env` file in the backend folder with:
```
JWT_SECRET=your-secret-key-here
```

Then start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup
In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will open at `http://localhost:5173`

### Test Login
Use these credentials to log in:
- Email: `test@example.com`
- Password: `123456`

## Features I Built

### Authentication
- JWT tokens that expire after 1 hour
- Protected routes - you can't see products without logging in
- Automatic token handling with axios interceptors
- Logout functionality

### Product Browsing
- Search with debounced input
- Filter by category (Electronics, Clothing, Books, etc.)
- Price range filtering
- Sort by price (low to high or high to low)
- Pagination - shows 8 products per page

### Shopping Cart
- Add/remove products
- Change quantities with +/- buttons
- Real-time total calculation
- Cart count shows in the header
- Everything stored in memory (resets when you refresh)

### Custom Hooks I Made
- `useAuth()` - handles login state and logout
- `useProducts()` - fetches products with loading states
- `useCart()` - manages cart operations
- `useFilterParams()` - handles search and filter state

## How JWT Works Here

1. **Login**: When you log in, the server creates a JWT token with your email
2. **Storage**: The token gets stored in Redux state
3. **Requests**: Every API request automatically includes the token in headers
4. **Protection**: Backend middleware checks the token before allowing access
5. **Expiration**: Tokens expire after 1 hour, you'll need to log in again

## Pagination Details

The pagination works on both frontend and backend:

**Backend**: 
- Accepts `page` and `limit` parameters
- Returns `{ products: [...], total: 123 }`
- Handles filtering before pagination

**Frontend**:
- Shows current page highlighted
- Previous/Next buttons
- Resets to page 1 when you change filters

## Assumptions and Limited

### Assumptions
- In-memory storage is fine for this demo
- Static product data is sufficient

### Limitations
- No User Registration required
- Cart data disappears when we refresh the page
