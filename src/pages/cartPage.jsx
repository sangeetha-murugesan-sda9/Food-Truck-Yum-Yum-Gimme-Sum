import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

export default function CartPage() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <div>{item.name} (x{item.quantity})</div>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
