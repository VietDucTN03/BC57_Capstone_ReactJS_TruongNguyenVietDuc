import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/config';

const initialState = {
    arrProduct: [
        // {
        //     "id": 1,
        //     "name": "Adidas Prophere",
        //     "alias": "adidas-prophere",
        //     "price": 350,
        //     "description": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
        //     "size": "[36,37,38,39,40,41,42]",
        //     "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
        //     "quantity": 995,
        //     "deleted": false,
        //     "categories": "[{\"id\":\"ADIDAS\",\"category\":\"ADIDAS\"},{\"id\":\"MEN\",\"category\":\"MEN\"},{\"id\":\"WOMEN\",\"category\":\"WOMEN\"}]",
        //     "relatedProducts": "[2,3,5]",
        //     "feature": true,
        //     "image": "https://shop.cyberlearn.vn/images/adidas-prophere.png"
        // },
        // {
        //     "id": 2,
        //     "name": "Adidas Prophere Black White",
        //     "alias": "adidas-prophere-black-white",
        //     "price": 450,
        //     "description": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
        //     "size": "[36,37,38,39,40,41,42]",
        //     "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
        //     "quantity": 990,
        //     "deleted": false,
        //     "categories": "[{\"id\":\"ADIDAS\",\"category\":\"ADIDAS\"},{\"id\":\"MEN\",\"category\":\"MEN\"},{\"id\":\"WOMEN\",\"category\":\"WOMEN\"}]",
        //     "relatedProducts": "[1,4,6]",
        //     "feature": false,
        //     "image": "https://shop.cyberlearn.vn/images/adidas-prophere-black-white.png"
        // },
    ],
    productDetail: null,
    cart: [

    ]
}

const ProductReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setArrayProductAction: (state, action) => {
            state.arrProduct = action.payload
        },
        getCartAction: (state, action) => {
            state.cart = [...state.cart, action.payload]
        },
        getNewCartAction: (state, action) => {
            const newCart = state.cart.map(cart => cart.id === action.payload.id ? {
                ...cart,
                quantity: action.payload.quantity
            } : cart)
            state.cart = newCart
        },
        deleteCartAction: (state, action) => {
            console.log(action);
            const cartDeleted = state.cart.filter(cart => cart.id !== action.payload)
            state.cart =cartDeleted
        }
    },
    extraReducers: (builder) => { // Gom số lần dispatch
        builder.addCase(getAllProductAsyncThunkAction.fulfilled, (state, action) => {
            // addCase có 3 trường hợp (thành công, thất bại, chờ đợi)
            state.arrProduct = action.payload
        })
    }
});

export const { setArrayProductAction, getCartAction, getNewCartAction, deleteCartAction } = ProductReducer.actions

export default ProductReducer.reducer

// -----------------------

export const getAllProductAPIAction = () => {  //closure function
    return async (dispatch) => {
        const res = await http.get('/');
        // Sau  khi có dữ liệu
        const action = setArrayProductAction(res.data.content);
        dispatch(action);
    }
}

export const getAllProductAsyncThunkAction = createAsyncThunk('productReducer/getAllProductAsyncThunkAction', async () => {
    const res = await http.get('/Product');
    // return kết quả 
    return res.data.content;
});

export const cartQuantity = (id, quantity) => {
    return async (dispatch) => {
        const payload = {id, quantity}
        const action = getNewCartAction(payload)
        dispatch(action)
    }
}

export const addCart = (cart) => {
    return async (dispatch) => {
        const action = getCartAction(cart)
        dispatch(action)
    }
}

export const deleteCart = (id) => {
    return async (dispatch) => {
        const action = deleteCartAction(id)
        dispatch(action)
    }
}