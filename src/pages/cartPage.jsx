import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { placeOrder } from '../features/order/orderSlice';
import '../styles/cart.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector(state => state.cart);
  const { status } = useSelector(state => state.order);

  const handlePlaceOrder = () => {
    dispatch(placeOrder())
      .unwrap()
      .then(() => {
        dispatch(clearCart());
        navigate('/order');
      })
      .catch(error => {
        console.error('Failed to place order:', error);
      });
  };

  if (items.length === 0) {
    return (
      <div className="cart-page text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Din varukorg är tom</h2>
        <Link to="/" className="text-yellow-600 hover:text-yellow-700">
          Tillbaka till menyn
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-text max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Min beställning</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b py-4">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">${item.price} x {item.quantity}</p>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => dispatch(updateQuantity({ 
                  id: item.id, 
                  quantity: Math.max(1, item.quantity - 1) 
                }))}
                className="minus-button px-5 py-3 bg-gray-200 rounded-l"
              >
                -
              </button>
              <span className="px-6 py-3 bg-gray-100 ">{item.quantity}</span>
              <button 
                onClick={() => dispatch(updateQuantity({ 
                  id: item.id, 
                  quantity: item.quantity + 1 
                }))}
                className="plus-button px-5 py-3 bg-gray-200 rounded-r"
              >
                +
              </button>

             
              
              <button 
                onClick={() => dispatch(removeItem(item.id))}
                className="remove px-5 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xl font-semibold "
              >
                Ta bort
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <h3 className="text-lg font-bold">TOTALT</h3>
          <p className="text-lg font-bold">${total.toFixed(2)}</p>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={status === 'Ladder'}
          className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 px-6 rounded disabled:opacity-50"
        >
          {status === 'laddar' ? 'Lägger beställning...' : 'Lägg beställning'}
        </button>
      </div>
    </div>
  );
};

export default CartPage;