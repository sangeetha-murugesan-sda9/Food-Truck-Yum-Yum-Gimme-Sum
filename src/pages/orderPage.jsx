import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const navigate = useNavigate();
  const { currentOrder, status, error } = useSelector(state => state.order);
  
  useEffect(() => {
    if (!currentOrder && status === 'idle') {
      navigate('/');
    }
  }, [currentOrder, status, navigate]);

  if (status === 'loading') {
    return <div className="text-center py-12">Loading order details...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Error: {error}</h2>
        <Link to="/" className="text-yellow-600 hover:text-yellow-700">
          Back to menu
        </Link>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No active order</h2>
        <Link to="/" className="text-yellow-600 hover:text-yellow-700">
          Back to menu
        </Link>
      </div>
    );
  }
  const order = currentOrder.order || currentOrder;
  
  if (!order.id) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Invalid order data</h2>
        <Link to="/" className="text-yellow-600 hover:text-yellow-700">
          Back to menu
        </Link>
      </div>
    );
  }

  const etaDate = new Date(order.eta);
  const now = new Date();
  const minutesLeft = Math.max(0, Math.round((etaDate - now) / 60000));

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Order #{order.id}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Estimated Delivery Time</h2>
          <p className="text-2xl text-yellow-600 font-bold">
            {minutesLeft > 0 ? `${minutesLeft} minutes` : 'Arriving soon!'}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Order Total</h2>
          <p className="text-2xl font-bold">${order.orderValue?.toFixed(2)}</p>
        </div>
        <Link 
          to={`/receipt/${order.id}`} 
          className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          View Receipt
        </Link>
      </div>
    </div>
  );
};

export default OrderPage;