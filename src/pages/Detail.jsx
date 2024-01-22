import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../assets/scss/pages/detail.scss';
import { addCart, cartQuantity } from '../redux/Reducers/ProductReducer'
import { useDispatch, useSelector } from 'react-redux';

const Detail = () => {

  const [productDetail, setProductDetail] = useState({})
  const { cart } = useSelector(state => state.productReducer);
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch();
  console.log('prodDetail', productDetail);

  const params = useParams()

  const getProductByID = async () => {
    const res = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${params.id}`,
      method: 'GET'
    })
    setProductDetail(res.data.content)
  }

  useEffect(() => {
    getProductByID()
  }, [params.id])

  return (
    <div className='container'>
      <div className='product-detail'>
        <div className="product-img">
          <img src={productDetail.image} alt="..." />
        </div>
        <div className="product-info">
          <h1 className="product-name">{productDetail.name}</h1>
          <p className="product-title">{productDetail.description}</p>
          <h3 className='available-size'>Available Size</h3>
          <div className="mt-2">
            {productDetail.size?.map((size) => {
              return <button className='btn btn-secondary m-1'>{size}</button>
            })}
          </div>
          <div className="product-price">
            <p className="price-detail">{productDetail.price} $</p>
          </div>
          <div className="product-quantity">
            <button id="btn-add" onClick={() => {
              setQuantity(quantity + 1)
            }}>+</button>
            <p className="quantity">{quantity}</p>
            <button id="btn-except" onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1)
              }
            }}>-</button>
          </div>
          <div className="add-to-cart">
            <NavLink id="to-cart" to='/cart' onClick={() => {
              const cartList = cart.find(cart => cart.id === productDetail.id)
              if (cartList) {
                const action = cartQuantity(productDetail.id, cartList.quantity + quantity)
                dispatch(action)
              } else {
                const cartAction = addCart({
                  id: productDetail.id, image: productDetail.image, name: productDetail.name, price: productDetail.price, quantity: quantity, total: productDetail.price * quantity
                })
                dispatch(cartAction)
              }
            }}><p className='btn-cart text-center'>Add to Cart</p></NavLink>
          </div>
        </div>
      </div>

      <h3 className='text-center m-5'>- Related Products -</h3>
      <div className="row">
        {productDetail.relatedProducts?.map((product) => {
          return <div className="col-md-4" key={product.id}>
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

export default Detail