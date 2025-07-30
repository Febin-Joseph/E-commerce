import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';

export default function Header() {
  const { cart } = useCart();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/products" className="text-2xl font-bold text-blue-600">
              E-Commerce
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Products
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Cart:</span>
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {cart.itemCount}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}