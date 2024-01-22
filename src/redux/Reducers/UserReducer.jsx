import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, USER_LOGIN, USER_PROFILE, USER_REGISTER, getStore, getStoreJson, http, saveStore, saveStoreJson } from '../../util/config';
import {history} from '../../index';

let userLoginDefault = {
    email: '',
    accessToken: ''
}

const initialState = {
    userRegister:getStore(USER_REGISTER),
    userLogin: userLoginDefault,
    userProfile:getStoreJson(USER_PROFILE),
    orderDetail: [
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
    ]
}

if (localStorage.getItem(USER_LOGIN)) {
    userLoginDefault = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const UserReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    registerAction:(state, action) => {
        state.userRegister = action.payload
    },
    loginAction: (state, action) => {
        state.userLogin = action.payload
    },
    getProfileAction: (state, action) => {
        state.userProfile = action.payload
    },
    updateProfileAction: (state, action) => {
        state.userProfile = action.payload;
    },
    setOrderDetail: (state, action) => {
        state.orderDetail = action.payload;
    },
  }
});

export const {registerAction, loginAction, getProfileAction, updateProfileAction, setOrderDetail} = UserReducer.actions

export default UserReducer.reducer

// export const getProfileApi = () => {
//     return async (dispatch) => {
//         const result = await http.post('/api/Users/getProfile');
//         const action = getProfileAction(result.data.content);
//         dispatch(action);
//         console.log(result.data.content);
//         saveStoreJson(USER_PROFILE, result.data.content)
//     }
// }

export const registerAPI = (userRegister) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/Users/signup', userRegister);
            const action = registerAction(result.data.content);
            console.log(action);
            dispatch(action);

            alert("Account registered successfully");
            history.push('/login');
        } catch (err) {

        }
    }
}

export const loginAPIAction = (userLogin) => {
    return async (dispatch) => {
        try {
            const res = await http.post('/Users/signin', userLogin);

            localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken);
            localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.content));

            const action = loginAction(res.data.content)
            dispatch(action);

            if (history.location.pathname !== '/profile') {
                alert("Logged in successfully!!");
                history.push('/profile');
            }
            dispatch(getProfileApiAction());
        } catch (err) {

        }
    }
}

export const getProfileApiAction = () => {
    return async (dispatch) => {
        try {
            const result = await http.post('/Users/getProfile');

            const action = getProfileAction(result.data.content)
            dispatch(action);
            console.log(result.data.content);
            saveStoreJson(USER_PROFILE, result.data.content)
            dispatch(setOrderDetail(result.data.content.ordersHistory.orderDetail));
        } catch(err) {

        }
    }
}

// export const setOrdersHistoryAction = (ordersHistory) => ({
//     type: 'SET_ORDERS_HISTORY',
//     payload: ordersHistory,
// });

export const updateProfileApi = (updateProfile) => {
    return async dispatch => {
        await http.post('/Users/updateProfile', updateProfile).then((res) => {
            const action = updateProfileAction(res.data.content);
            dispatch(action);
            alert('Update Successful^_^');
            console.log(action);
        }).catch((err) => {
            alert(`${err.response.data.content}`);
            return;
        })
    }
}

// export const checkLogin = () => {
//     const userLogin = getStoreJson(USER_LOGIN);
//     if (!userLogin || !userLogin.accessToken) {
//         alert('Bạn cần đăng nhập để tiếp tục.');
//         // Điều hướng đến trang đăng nhập
//         history.push('/login');
//         return;
//     }
// };
