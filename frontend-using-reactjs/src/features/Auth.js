import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUserData =createAsyncThunk('auth/setUserData', async (data,{rejectWithValue}) => {
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
        }
        else if (response.status === 401) {
            return rejectWithValue('Invalid token');
        }
        else {
            return null;
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}
);

export const getCustomerData =createAsyncThunk('auth/setCustomerData', async (data,{rejectWithValue}) => {
    if (!data) {
        return rejectWithValue('Invalid token');
    }
    const response = await fetch('http://localhost:5000/api/customer/user', {
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
        }
        else if (response.status === 401) {
            return rejectWithValue('Invalid token');
        }
        else {
            return null;
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

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

        builder.addCase(getUserData.pending, (state, action) => {
            state.user = [];
        });

        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.user = action.payload;
            console.log(action.payload)
        });

        builder.addCase(getUserData.rejected, (state, action) => {
            //if token is invalid or expired
            state.user = [];
            state.token = null;
        });

        builder.addCase(getCustomerData.pending, (state, action) => {
            state.user = [];
        });
        builder.addCase(getCustomerData.fulfilled, (state, action) => {
            state.user = action.payload;
            console.log(action.payload)
        });
        builder.addCase(getCustomerData.rejected, (state, action) => {
            state.user = [];
            state.token = null;
        });

    },

    
});

export const { setToken, getToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;
