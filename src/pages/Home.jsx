import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../assets/scss/pages/home.scss'
import { getAllProductAsyncThunkAction } from '../redux/Reducers/ProductReducer';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();
  const arrProduct = useSelector((state) => state.productReducer.arrProduct);
  const mainProduct = arrProduct.length > 0 ? arrProduct[0] : null;

  useEffect(() => {
    dispatch(getAllProductAsyncThunkAction());
  }, [dispatch]);

  return (
    <div className='container'>
      {mainProduct && (
        <div className='main-product'>
          <div className='product-img'>
            <img src={mainProduct.image} alt='Giay' />
          </div>
          <div className='product-content'>
            <h1 className='product-name'>{mainProduct.name}</h1>
            <p className='main-product-detail'>Product description....</p>
            <NavLink to={`/detail/${mainProduct.id}`}>
              <button id='btn-buy'>Buy now</button>
            </NavLink>
          </div>
        </div>
      )}

      <h3 className='product-feature'>Product Feature</h3>

      <div className="row">
        {arrProduct.map((product) => {
          return <div className='col-4 mt-2' key={product.id}>
            <NavLink className='list-product' style={{ textDecoration: 'none' }} to={`/detail/${product.id}`}>
              <div className="card">
                <div className="card-body">
                  <img src={product.image} alt />
                </div>
                <div className="card-footer">
                  <h3 className="p-name">{product.name}</h3>
                  <p className="p-title">{product.alias}</p>
                  <div className="btnbuy-price">
                    <NavLink className='btn btn-success text-dark' to={`/detail/${product.id}`}>Buy</NavLink>
                    <div className="product-price">{product.price} $</div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        })}
      </div>
    </div>
  )
}

export default Home