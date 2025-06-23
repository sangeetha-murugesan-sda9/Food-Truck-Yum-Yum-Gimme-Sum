import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Fetch general API key from /keys endpoint
export const fetchApiKey = createAsyncThunk('tenant/fetchApiKey', async () => {
  const resp = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys', {
    method: 'POST',
  });
  if (!resp.ok) {
    throw new Error(`API error ${resp.status}`);
  }
  const data = await resp.json();
  return data.apiKey;
});

// 2. Create tenant with name, passing the API key in header
export const createTenant = createAsyncThunk(
  'tenant/createTenant',
  async (name, thunkAPI) => {
    const state = thunkAPI.getState();
    const apiKey = state.tenant.apiKey;  // general API key from /keys

    const resp = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-zocom': apiKey, // API key header
      },
      body: JSON.stringify({ name }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      throw new Error(`API error ${resp.status}: ${errorText}`);
    }

    const data = await resp.json();
    return data.apiKey;  // tenant-specific API key
  }
);

const tenantSlice = createSlice({
  name: 'tenant',
  initialState: { apiKey: '', tenantApiKey: '', status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiKey.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchApiKey.fulfilled, (state, action) => {
        state.apiKey = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchApiKey.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTenant.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.tenantApiKey = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createTenant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tenantSlice.reducer;
