import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import '../assets/scss/pages/search.scss'

const Search = () => {

  // const dispatch = useDispatch();
  // const arrProduct = useSelector((state) => state.productReducer.arrProduct);
  // const [arrProductSearch, setArrProductSearch] = useState(arrProduct)

  // const handleSubmit = async (event, values) => {
  //   event.preventDefault()
  //   const nameProduct = event.target.elements.nameProduct.values
  //   const result = await http.get(`/Product?keyword=${nameProduct}`)
  //   setArrProductSearch(result.data.content)
  // }

  const [searchParams, setSearchParams] = useSearchParams()
  const [arrProduct, setArrProduct] = useState([])
  const k = searchParams.get('keyword');
  const [sortOrder, setSortOrder] = useState('asc');
  const formSearch = useFormik({
    initialValues: {
      keyword: k
    },
    onSubmit: ({keyword}) => {
      console.log(keyword);
      setSearchParams({
        keyword:keyword
      })
    }
  })

  const getProductByKeyword = async () => {
    let url = 'https://shop.cyberlearn.vn/api/Product';

    // Sử dụng điều kiện để kiểm tra keyword
    if (k && k.trim() !== '') {
      url += `?keyword=${k}`;
    }

    const result = await axios({
      url: url,
      method: 'GET',
    });
    setArrProduct(result.data.content);
  };

  useEffect(() => {
    getProductByKeyword()
  }, [k])

  // useEffect(() => {
  //   dispatch(getAllProductAsyncThunkAction());
  // }, [dispatch]);

  const handleSort = (order) => {
    const sortedProducts = [...arrProduct].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);

      if (order === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    setArrProduct(sortedProducts);
    setSortOrder(order);
  };

  return (
    <div className='container mt-5'>
      <form className='search-input' action="" onSubmit={formSearch.handleSubmit}>
        <h5>Search</h5>
        <input type="text" className='nameProduct border-0' placeholder='Search name' id='keyword' name='keyword' onChange={formSearch.handleChange} value={formSearch.keyword}/>
        <button className='input-group-button border-0 shadow-lg'>SEARCH</button>
      </form>
      <hr />
      <h3 className='search-title'>Search Result</h3>
      <div className="price">
        <p className='abc'>Price</p>
        <button className='btn' onClick={() => {
          handleSort('desc')
        }}>decrease</button>
        <br />
        <button className='btn' onClick={() => {
          handleSort('asc')
        }}>ascending</button>
      </div>
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

export default Search