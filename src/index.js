import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeTemplate from './templates/HomeTemplate';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search'
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';

import {createBrowserHistory} from 'history'

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/detail'>
            <Route path=':id' element={<Detail/>}></Route>
          </Route>
          <Route path='/search' element={<Search/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
