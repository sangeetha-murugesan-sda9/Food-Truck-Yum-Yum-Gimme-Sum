import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cart from '../assets/cart.png';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  
  return (
    <nav className="bg-yellow-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 yum>
          Yum Yum Gimme Sum 
          <Link to="/" className=" MenuText text-white hover:text-gray-200">
          <button>Meny</button>
            
          </Link>
        </h1>
        <div className="flex space-x-4">
          
          <Link to="/cart" className=" cartLink text-white hover:text-gray-200 relative">
            
            <img 
              src={cart} 
              alt="Shopping Cart" 
              className="h-6 w-6 object-contain mt-1 group-hover:opacity-80 transition-opacity"
            /> 
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