import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart } from '../redux/Reducers/ProductReducer';
import { USER_LOGIN, getStoreJson, http } from '../util/config';
import '../assets/scss/pages/cart.scss'

const Cart = () => {

  const {cart} = useSelector(state => state.productReducer)

  const [selectedProductIds, setSelectedProductIds] = useState([]); // State mới để theo dõi ID sản phẩm được chọn

  const [selectType, setSelectType] = useState('checkbox');
  const dispatch = useDispatch()
  const [emailFromApi, setEmailFromApi] = useState('');

  useEffect(() => {
    const getEmailFromApi = async () => {
      try {
        const result = await http.post('/Users/getProfile');
        setEmailFromApi(result.data.content.email);
      } catch (err) {
        // Xử lý lỗi khi gọi API
        console.error('Error fetching email from API:', err);
      }
    };
  
    getEmailFromApi();
  }, []); // Chạy useEffect chỉ một lần sau khi component mount
  

  const columns = [
    { //object thứ nhất = cột thứ nhất
      title: 'id',
      dataIndex: 'id',
      name: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'image',
      dataIndex: 'image',
      name: 'image',
      render: function (text, record, index) {
        return <div>
          <img src={text} alt="..." width={50} height={50} />
        </div>
      }
    },
    {
      title: 'name',
      dataIndex: 'name',
      name: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      // filters: [],
      // filterMode: 'tree',
      // filterSearch: true,
      // onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: 'price',
      dataIndex: 'price',
      name: 'price',
      render: function (text, record, index) {
        return <div>{record.price}</div>;
      }
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      name: 'quantity',
      render: function (text, record, index) {
        return <div>{record.quantity}</div>;
      }
    },
    {
      title: 'total',
      dataIndex: '',
      name: 'total',
      render: ({ price }, { quantity }) => (<div>{price * quantity}</div>)
    },
    {
      title: 'action',
      key: '',
      dataIndex: '',
      render: (record) => (
          <div className='buttonEvent'>
              <button className='btn button-edit border-0 shadow text-white'>EDIT</button>
              <button className='btn btn-danger border-0 shadow' onClick={() => {
                  console.log("bbbb");
                  const action = deleteCart(record.id)
                  dispatch(action)
              }}>DELETE</button>
          </div>
      )
    },
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setSelectedProductIds(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
  };

  return (
    <div className='container mt-4'>
      <h3>Carts</h3>
      <hr />
      {/* {checkLogin()} */}
      <Table rowSelection={{
        type: selectType,
          ...rowSelection,
      }} columns={columns} dataSource={cart} pagination={false} rowKey="id"></Table>
      <button onClick={ async() => {
        // checkLogin();
        if (selectedProductIds.length === 0) {
          alert('Please select at least one product before submitting your order!!');
          return;
        }

        const orderDetail = cart
          .filter(product => selectedProductIds.includes(product.id)) // Lọc chỉ những sản phẩm được chọn
          .map(product => ({
            productId: product.id,
            quantity: product.quantity
          }));
        const userLogin = getStoreJson(USER_LOGIN)
        const payload = {
          orderDetail,
          email: emailFromApi || userLogin.email, // Sử dụng email từ API nếu có, ngược lại sử dụng email từ userLogin
        };
        
        console.log(payload);
        const result = await http.post('/Users/order', payload)
        if (result) {
          alert('Order Successful')
        }
      }} className='btn btn-warning text-white border-0 shadow float-end btnOrder'>SUBMIT ORDER</button>
    </div>
  )
}

export default Cart