import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import plateImage from '../assets/plate.png'; 

const OrderPage = () => {
  const navigate = useNavigate();
  const { currentOrder, status, error } = useSelector(state => state.order);
  
  useEffect(() => {
    if (!currentOrder && status === 'idle') {
      navigate('/');
    }
  }, [currentOrder, status, navigate]);
  
  if (status === 'loading') {
    return <div className=" order-details text-center py-12">Loading order details...</div>;
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
    <div className="order-details max-w-2xl mx-auto text-center">
      <img src={plateImage} alt="Loading" className="h-32 mb-6 animate-pulse" />
       <h1 className="text-3xl font-bold mb-6">DINA WONTONS TILLAGAS!</h1>
      <h1 className="text-3xl font-bold mb-6">Beställa #{order.id}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Beräknad leveranstid</h2>
          <p className="text-2xl text-yellow-600 font-bold">
            {minutesLeft > 0 ? `${minutesLeft} minutes` : 'Arriving soon!'}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Order Totallt</h2>
          <p className="text-2xl font-bold">${order.orderValue?.toFixed(2)}</p>
        </div>
        <Link 
          to={`/receipt/${order.id}`} 
          className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
        <button> Se kvitto </button> 
        </Link>
      </div>
    </div>
  );
};

export default OrderPage;