import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const ingredients = item.ingredients || [];
  const ingredientsText = Array.isArray(ingredients) 
    ? ingredients.join(', ') 
    : String(ingredients);

  return (
    <div className="transform transition-transform hover:scale-[1.01] w-full mb-6"> {/* Added mb-6 for spacing */}
      <div className="p-5 border-b border-grey-600 last:border-b-0">
       
        {/* Menu item name and price with dotted separator */}
        <div className="flex items-center uppercase text-left mb-3">
          <span className="menu-item-name text-white mr-2 whitespace-nowrap text-lg sm:text-xl md:text-2xl">
            {item.name}
          </span>
          <span className="flex-grow border-t border-dotted border-gray-400 mx-2"></span>
          <span className="menu-item-price text-yellow-400 font-bold whitespace-nowrap text-lg sm:text-xl md:text-2xl">
            {item.price} SEK
          </span>
        </div>

        {ingredients.length > 0 && (
          <div className="mb-4 px-2">
            <p className="ingredients-text text-gray-300 text-xs sm:text-sm md:text-base italic">
              {ingredientsText}
            </p>
          </div>
        )}

        {/* Add to Cart button */}
        <button
          onClick={() => dispatch(addItem(item))}
          className="w-full bg-gradient-to-b from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md transform hover:scale-[1.03] active:scale-[0.98]"
        >
          LÄGG TILL
        </button>
      </div>
    </div>
  );
};

export default MenuItem;