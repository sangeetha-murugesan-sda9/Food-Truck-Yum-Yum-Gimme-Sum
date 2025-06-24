import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (_, { getState, rejectWithValue }) => {
    const { apiKey, tenantId } = getState().tenant;
    const { items } = getState().cart;
    
    if (!tenantId) {
      return rejectWithValue('Tenant ID is missing');
    }
    
    const orderItems = items.flatMap(item => 
      Array(item.quantity).fill(item.id)
    );
    
    try {
      const response = await fetch(
        `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantId}/orders`,
        {
          method: "POST",
          headers: { 
            "x-zocom": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: orderItems }),
        }
      );
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to place order');
      }
      
      const data = await response.json();
      // Extract order from response object
      return data.order || data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReceipt = createAsyncThunk(
  'order/fetchReceipt',
  async (orderId, { getState, rejectWithValue }) => {
    const { apiKey } = getState().tenant;
    
    if (!orderId) {
      return rejectWithValue('Order ID is required');
    }
    
    try {
      const response = await fetch(
        `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/receipts/${orderId}`,
        {
          method: "GET",
          headers: { "x-zocom": apiKey },
        }
      );
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch receipt');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null,
    receipt: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
      state.receipt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle both response formats
        state.currentOrder = action.payload.order || action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchReceipt.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReceipt.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.receipt = action.payload;
      })
      .addCase(fetchReceipt.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;