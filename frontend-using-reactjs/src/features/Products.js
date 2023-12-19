import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


export const getProducts = createAsyncThunk('products/getProducts', async (data, {rejectWithValue}) => {
    const response = await fetch('http://localhost:5000/api/product', {
        method: 'GET',
        headers: {
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
});

export const registerProduct = createAsyncThunk('products/registerProduct', async (data, {rejectWithValue}) => {
    const response = await fetch('http://localhost:5000/api/product/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, {rejectWithValue}) => {
    const response = await fetch(`http://localhost:5000/api/product/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}
);

export const updateProduct = createAsyncThunk('products/updateProduct', async (data,{rejectWithValue}) => {
    const response = await fetch(`http://localhost:5000/api/product/update/${data._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}
);

export const searchProduct = createAsyncThunk('products/searchProduct', async (name, {rejectWithValue}) => {
    const response = await fetch(`http://localhost:5000/api/product/search/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getProductbyEmail = createAsyncThunk('products/getProductbyEmail', async (email, {rejectWithValue}) => {
    const response = await fetch(`http://localhost:5000/api/product/search/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



    


const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: [],
    },
    reducers: {},
    extraReducers(builder) {

        builder.addCase(getProducts.pending, (state, action) => {
            state.products = [];
        });

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });

        builder.addCase(getProducts.rejected, (state, action) => {
            state.products = [];
        });

        builder.addCase(registerProduct.pending, (state, action) => {
            state.product = [];
        });

        builder.addCase(registerProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.products.product.push(action.payload.product);
        });

        builder.addCase(registerProduct.rejected, (state, action) => {
            state.product = [];
        });
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.product = [];
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.product = action.payload.product;
            const index = state.products.product.findIndex((product) => product._id === action.payload.product._id);
            state.products.product.splice(index, 1);

      })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.product = [];
            state.products = action.payload;    
        });

        builder.addCase(updateProduct.pending, (state, action) => {
            state.product = [];
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.product = action.payload.product;
            const index = state.products.product.findIndex((product) => product._id === action.payload.product._id);
            state.products.product[index] = action.payload.product;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.product = [];
            state.products = action.payload;
        });

        builder.addCase(searchProduct.pending, (state, action) => {
            state.products = [];
        });
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.products = action.payload;

        });
        builder.addCase(searchProduct.rejected, (state, action) => {
            state.products = [];
        });
        builder.addCase(getProductbyEmail.pending, (state, action) => {
            state.products = [];
        });
        builder.addCase(getProductbyEmail.fulfilled, (state, action) => {
            state.products = action.payload;
            console.log(action.payload);
        });
        builder.addCase(getProductbyEmail.rejected, (state, action) => {
            state.products = [];
        });

    },
});

export default productSlice.reducer;