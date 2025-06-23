import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const placeOrder = createAsyncThunk('order/placeOrder', async (_, { getState }) => {
  const state = getState();
  const { apiKey, tenantId } = state.tenant;
  const cart = state.cart;

  const resp = await fetch(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/order/${tenantId}`, {
    method: 'POST',
    headers: { "x-zocom": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      products: cart.map(item => ({ id: item.id, amount: item.quantity })),
    }),
  });

  return await resp.json();
});

const orderSlice = createSlice({
  name: 'order',
  initialState: { orderId: '', eta: '', status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderId = action.payload.orderNr;
        state.eta = action.payload.eta;
        state.status = 'succeeded';
      });
  },
});

export default orderSlice.reducer;
