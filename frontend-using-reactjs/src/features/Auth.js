import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const setUserData =createAsyncThunk('auth/setUserData', async (data,{rejectWithValue}) => {
    if (!data) {
        return rejectWithValue('Invalid token');
    }
    const response = await fetch('http://localhost:5000/api/auth/user', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${data}`,
            'Content-Type': 'application/json',
        }
});
    try {
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return null;
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'), 
        user:[],
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload); // Store token in local storage
        },
        getToken: (state) => {
            state.token = localStorage.getItem('token'); // Get token from local storage  
        },
        deleteToken: (state) => {
            state.token = null;
            localStorage.removeItem('token'); // Remove token from local storage
        },
    },
    extraReducers (builder) {

        builder.addCase(setUserData.pending, (state, action) => {
            state.user = [];
        });

        builder.addCase(setUserData.fulfilled, (state, action) => {
            state.user = action.payload;
        });

        builder.addCase(setUserData.rejected, (state, action) => {
            state.user = [];
        });

    },

    
});

export const { setToken, getToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;
