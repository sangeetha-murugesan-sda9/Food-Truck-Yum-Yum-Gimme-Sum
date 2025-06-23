import { useSelector } from "react-redux";

import { useSelector } from 'react-redux';

export default function ReceiptPage() {
  const order = useSelector((state) => state.order);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Receipt</h1>
      {order.orderId ? (
        <div>
          <p>Thank you for your order!</p>
          <p>Order ID: {order.orderId}</p>
          <p>ETA: {order.eta} minutes</p>
        </div>
      ) : (
        <p>No recent order found.</p>
      )}
    </div>
  );
}

