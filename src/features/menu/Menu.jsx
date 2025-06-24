import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-3">{item.description}</p>
        {item.ingredients && (
          <div className="mb-3">
            <h4 className="font-semibold">Ingredients:</h4>
            <p className="text-sm text-gray-600">{item.ingredients.join(', ')}</p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${item.price}</span>
          <button
            onClick={() => dispatch(addItem(item))}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;