import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const tenantApiKey = state.tenant.tenantApiKey;

    const resp = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu', {
      method: 'GET',
      headers: {
        'x-zocom': tenantApiKey,
      },
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      throw new Error(`API error ${resp.status}: ${errorText}`);
    }

    const data = await resp.json();
    return data.menu || []; // assuming the response has a "menu" array
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
