import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './Reducers/UserReducer'
import ProductReducer from './Reducers/ProductReducer'

export const store = configureStore({
    reducer: {
        userReducer:UserReducer,
        productReducer:ProductReducer,
    }    
})