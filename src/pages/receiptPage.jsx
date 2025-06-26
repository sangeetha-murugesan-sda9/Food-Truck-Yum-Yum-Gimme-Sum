import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReceipt } from '../features/order/orderSlice';

const ReceiptPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { receipt, status, error } = useSelector(state => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchReceipt(id));
    }
  }, [id, dispatch]);


  const extractReceiptData = () => {
    if (!receipt) return null;
    if (receipt.receipt) {
      return receipt.receipt;
    }
    return receipt;
  };

  const receiptData = extractReceiptData();
  const items = receiptData?.items || [];
  const orderId = receiptData?.id || id || 'N/A';
  const timestamp = receiptData?.timestamp || new Date().toISOString();
  const orderValue = receiptData?.orderValue || 0;
  
  // Calculate total from items if orderValue is not provided
  const calculatedTotal = items.reduce((sum, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    return sum + (price * quantity);
  }, 0);
  
  // Use orderValue if available, otherwise use calculated total
  const total = orderValue > 0 ? orderValue : calculatedTotal;

  if (status === 'loading') {
    return <div className="text-center py-12">Läser in kvitto...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Fel: {error}</h2>
        <Link to="/" className="text-yellow-600 hover:text-yellow-700">
          Tillbaka till menyn
        </Link>
      </div>
    );
  }

  if (!receipt || !receiptData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Inget kvitto hittades</h2>
        <Link to="/" className="text-yellow-600 hover:text-yellow-700">
          Tillbaka till menyn
        </Link>
      </div>
    );
  }

  return (
    <div className=" receipt-page max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Yum Yum Gimme Sum</h1>
        <p className="text-gray-600">kvitto för matvagn</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">KVITTO #{orderId}</h2>
              <p className="text-gray-600">
                {new Date(timestamp).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                {new Date(timestamp).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Orderstatus: Slutförd</p>
            </div>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Ordersammanfattning</h3>
            {items.length === 0 ? (
              <div className="text-center py-6 bg-yellow-50 rounded-lg">
                <p className="text-yellow-700">Inga varor hittades i den här beställningen</p>
                <p className="text-sm mt-2">Detta kan bero på ett tillfälligt API-problem</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Item</div>
                  <div className="col-span-2 text-center">Enhetspris</div> 
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                {items.map((item, index) => {
                  const unitPrice = item.price || 0; 
                  const itemQuantity = item.quantity || 0;
                  const itemTotal = unitPrice * itemQuantity;
                  
                  return (
                    <div key={item.id || index} className="grid grid-cols-12 p-3 border-b">
                      <div className="col-span-1">{index + 1}</div>
                      <div className="col-span-5">
                        <div className="font-medium">{item.name || 'Unnamed Item'}</div>
                        <div className="text-sm text-gray-600">{item.type || 'Item'}</div>
                      </div>
                      {/* unit price*/}
                      <div className="col-span-2 text-center">${unitPrice.toFixed(2)}</div>
                      <div className="col-span-2 text-center">{itemQuantity}</div>
                      {/* Calculated total */}
                      <div className="col-span-2 text-right">
                        ${itemTotal.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full md:w-1/3">
              <div className="flex justify-between py-2">
                <span className="font-semibold">Delsumma:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span className="font-semibold">Skattebelopp (0%):</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between py-2 border-t border-b">
                <span className="font-semibold">Rabatt:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 text-center">
          <p className="mb-4">Tack för din beställning på Yum Yum Gimme Sum!</p>
          <Link 
            to="/" 
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
          >
           <button>GÖR EN NY BESTÄLLNING</button> 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;