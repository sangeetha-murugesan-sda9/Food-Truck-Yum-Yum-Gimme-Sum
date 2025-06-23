// File: src/pages/Home.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from '../features/menu/menuSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.menu.items);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.id} className="border p-4 rounded shadow">
          <h2 className="font-bold text-xl">{item.name}</h2>
          <p>{item.price} kr</p>
          <button
            onClick={() => dispatch(addToCart(item))}
            className="bg-green-500 text-white mt-2 px-4 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
