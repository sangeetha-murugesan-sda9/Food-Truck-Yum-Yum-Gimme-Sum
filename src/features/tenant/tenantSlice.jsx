import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchApiKey = createAsyncThunk(
  'tenant/fetchApiKey',
  async () => {
    try {
      const response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys", {
        method: "POST"
      });
      if (!response.ok) throw new Error('Failed to fetch API key');
      
      const data = await response.json();
      console.log("API Key received:", data.key);
      return data.key; 
    } catch (error) {
      console.error("API Key error:", error);
      throw error;
    }
  }
);

export const registerTenant = createAsyncThunk(
  'tenant/registerTenant',
  async (tenantName, { getState, rejectWithValue }) => {
    try {
      const { apiKey } = getState().tenant;
      if (!apiKey) throw new Error('No API key available');
      
      console.log("Registering tenant with API key:", apiKey);
      const response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants", {
        method: "POST",
        headers: { 
          "x-zocom": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: tenantName }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to register tenant');
      }
      
      const data = await response.json();
      console.log("Tenant registered:", data);
      return data;
    } catch (error) {
      console.error("Tenant registration error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const tenantSlice = createSlice({
  name: 'tenant',
  initialState: {
    apiKey: null,
    tenantId: null,
    name: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiKey.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApiKey.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.apiKey = action.payload;
      })
      .addCase(fetchApiKey.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerTenant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerTenant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tenantId = action.payload.id;
        state.name = action.payload.name;
      })
      .addCase(registerTenant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default tenantSlice.reducer;