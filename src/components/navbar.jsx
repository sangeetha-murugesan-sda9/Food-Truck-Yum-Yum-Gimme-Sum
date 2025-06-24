import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  
  return (
    <nav className="bg-yellow-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          Yum Yum Gimme Sum
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Menu
          </Link>
          <Link to="/cart" className="text-white hover:text-gray-200 relative">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;