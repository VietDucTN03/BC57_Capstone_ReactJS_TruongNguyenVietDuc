import axios from "axios";
import {history} from '../index';

export const ACCESS_TOKEN = 'accessToken';
export const USER_REGISTER = 'userRegister';
export const USER_LOGIN = 'userLogin';
export const USER_PROFILE = 'userProfile';
export const USER_UPDATE = 'userUpdate'

export const {saveStore, getStoreJson, getStore, saveStoreJson} = {
    saveStore: (name, stringValue) => {
        localStorage.setItem(name, stringValue);
        return stringValue;
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name);
        }
        return null;
    },
    getStoreJson: (name) => {
        if (localStorage.getItem(name)) {
            return JSON.parse(localStorage.getItem(name));
        }
        return null;
    },
    saveStoreJson: (name, object) => {
        let stringObject = JSON.stringify(object);
        localStorage.setItem(name, stringObject);
        return stringObject;
    },
}

export const http = axios.create({
    baseURL: 'https://shop.cyberlearn.vn/api',
    timeout: 30000
})

http.interceptors.request.use((config) => {
    config.headers = {...config.headers,
        'Authorization': `Bearer ${getStore(ACCESS_TOKEN)}`,       
    }
    return config
}, (err) => {
    return Promise.reject(err);
})

http.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response?.status === 400) {
        alert("Email already exists. Please choose another email.");
        history.push('/register')
    } else if (err.response?.status === 401) {
        alert('Login to visit this page!')
        history.push('/login')
    } else if (err.response?.status === 404) {
        alert("Email or password is incorrect :((");
        history.push('/login');
    }
    return Promise.reject(err);
})