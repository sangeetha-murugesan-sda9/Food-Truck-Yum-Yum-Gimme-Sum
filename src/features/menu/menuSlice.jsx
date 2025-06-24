import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMenu = createAsyncThunk(

'menu/fetchMenu',

async (_, { getState, rejectWithValue }) => {

const { apiKey } = getState().tenant;

console.log("Fetching menu with API key:", apiKey);

try {

const response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu", {

method: "GET",

headers: { "x-zocom": apiKey },

});

if (!response.ok) {

const error = await response.json();

throw new Error(error.message || 'Failed to fetch menu');

}

const data = await response.json();

console.log("Menu API response:", data);

// Extract items from the response object

if (!data.items || !Array.isArray(data.items)) {

throw new Error('Invalid menu data format');

}

return data.items; // Return just the array of items

} catch (error) {

console.error("Menu fetch error:", error);

return rejectWithValue(error.message);

}

}

);


const menuSlice = createSlice({

name: 'menu',

initialState: {

items: [],

status: 'idle',

error: null,

},

reducers: {},

extraReducers: (builder) => {

builder

.addCase(fetchMenu.pending, (state) => {

state.status = 'loading';

})

.addCase(fetchMenu.fulfilled, (state, action) => {

state.status = 'succeeded';

state.items = action.payload;

})

.addCase(fetchMenu.rejected, (state, action) => {

state.status = 'failed';

state.error = action.payload;

});

},

});

export default menuSlice.reducer;