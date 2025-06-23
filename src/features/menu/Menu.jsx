import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "./menuSlice";
import { addToCart } from "../cart/cartSlice";

export default function Menu() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  if (status !== 'succeeded') return <p>Loading menu...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map(item => (
        <div key={item.id} className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-bold">{item.name}</h2>
          <p>{item.desc}</p>
          <p className="font-semibold">{item.price} kr</p>
          <button
            className="mt-2 bg-orange-400 text-white py-1 px-3 rounded"
            onClick={() => dispatch(addToCart(item))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
