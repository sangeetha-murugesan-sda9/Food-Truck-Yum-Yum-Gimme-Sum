import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import tenantReducer from '../features/tenant/tenantSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    order: orderReducer,
    tenant: tenantReducer,
  },
});