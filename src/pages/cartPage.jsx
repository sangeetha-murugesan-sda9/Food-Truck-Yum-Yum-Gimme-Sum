import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { placeOrder } from '../features/order/orderSlice';

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
        // Optionally show an error message to the user
      });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-yellow-600 hover:text-yellow-700">
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Order</h1>
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
                className="px-2 py-1 bg-gray-200 rounded-l"
              >
                -
              </button>
              <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
              <button 
                onClick={() => dispatch(updateQuantity({ 
                  id: item.id, 
                  quantity: item.quantity + 1 
                }))}
                className="px-2 py-1 bg-gray-200 rounded-r"
              >
                +
              </button>
              <button 
                onClick={() => dispatch(removeItem(item.id))}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <h3 className="text-lg font-bold">Total</h3>
          <p className="text-lg font-bold">${total.toFixed(2)}</p>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={status === 'loading'}
          className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded disabled:opacity-50"
        >
          {status === 'loading' ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default CartPage;