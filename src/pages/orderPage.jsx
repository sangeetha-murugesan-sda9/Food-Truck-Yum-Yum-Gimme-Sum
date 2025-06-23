import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";

export default function OrderPage() {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);

  const handlePlaceOrder = async () => {
    await dispatch(placeOrder());
    dispatch(clearCart());
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Order</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
      {order.status === "succeeded" && (
        <div className="mt-4">
          <p>Order Number: {order.orderId}</p>
          <p>ETA: {order.eta} min</p>
        </div>
      )}
    </div>
  );
}
