import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { getProfileApiAction, updateProfileApi } from '../redux/Reducers/UserReducer';
import { useFormik } from 'formik';
import '../assets/scss/pages/profile.scss'

const Profile = () => {

  const { userProfile, orderDetail } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  const form = useFormik({
    initialValues: {
      email: userProfile?.email || '',
      password: '',
      name: userProfile?.name || '',
      phone: userProfile?.phone || '',
      gender: userProfile?.gender || false,
    },
    onSubmit: (values) => {
      const updateProfile = updateProfileApi(values);
      dispatch(updateProfile);
    },
  });

  // useEffect(() => {
  //   if (userProfile && userProfile.ordersHistory && !isProfileLoaded) {
  //     form.setValues({
  //       email: userProfile.email || '',
  //       name: userProfile.name || '',
  //       phone: userProfile.phone || '',
  //       gender: userProfile.gender === true,
  //     });
  //     setIsProfileLoaded(true); // Đánh dấu là đã tải hồ sơ
  //   }
  // }, [form, userProfile, isProfileLoaded]);

  useEffect(() => {
    const action = getProfileApiAction();
    dispatch(action);
    form.setFieldValue(userProfile)
  }, []);


  // Tạo table (Ant Design)
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  // Lấy dữ liệu từ redux về
  const { arrProduct } = useSelector(state => state.productReducer)
  // const dispatch = useDispatch();

  const getAllProduct = async () => {}

  useEffect(() => {
    // All API
    getAllProduct()
    // dispatch(getProfileApiAction());
  }, [])

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const mapProduct = new Map();

  if (userProfile && userProfile.ordersHistory) {
    userProfile.ordersHistory.forEach((order, orderID) => {
      order.orderDetail.forEach((item) => {
        const imgP = item.image;

        if (mapProduct.has(imgP)) {
          // Nếu sản phẩm đã tồn tại trong map, tăng số lượng
          const orderProduct = mapProduct.get(imgP);
          orderProduct.quantity += 1;
        } else {
          // Nếu sản phẩm chưa tồn tại trong map, thêm mới vào map
          mapProduct.set(imgP, {
            id: orderID + 1,
            image: item.image,
            name: item.name,
            price: item.price,
            quantity: 1,
          });
        }
      });
    });
  }

  const dataSource = Array.from(mapProduct.values());

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      name: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'image',
      dataIndex: 'image',
      name: 'image',
      render: (text, record, index) => (
        <div>
          <img src={text} alt="..." width={50} height={50} />
        </div>
      ),
    },
    {
      title: 'name',
      dataIndex: 'name',
      name: 'name',
    },
    {
      title: 'price',
      dataIndex: 'price',
      name: 'price',
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      name: 'quantity',
    },
    {
      title: 'total',
      dataIndex: '',
      name: 'total',
      render: ({ price }, { quantity }) => (<div>{price * quantity}</div>)
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <form className='container' onSubmit={form.handleSubmit}>
      <h3 className='mt-4 title-profile'>Profile</h3>
      <hr />
      <div className="row container">
        <div className=" col-xl-3 col-xs-12 text-center">
          <div className="avatar avatar-profile m-auto">
            <img src={userProfile?.avatar} alt="..." className='w-75 rounded-circle' />
          </div>
        </div>
        <div className="input-left col-4">
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <input type="text" className='form-control bg-light' placeholder='email' name='email' value={form.values.email} onChange={form.handleChange} />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="phone">Phone</label>
            <input type="text" className='form-control bg-light' placeholder='phone' name='phone' value={form.values.phone} onChange={form.handleChange} />
          </div>
        </div>
        <div className="input-right col-4">
          <div className="form-group mt-3">
            <label htmlFor="name">Name</label>
            <input type="text" className='form-control bg-light' placeholder='name' name='name' value={form.values.name} onChange={form.handleChange} />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="password">Password</label>
            <input type="password" className='form-control bg-light' placeholder='password' name='password' value={form.values.password} onChange={form.handleChange} />
          </div>
          <div className="updateGender form-group mt-4">
            <label htmlFor="gender">Gender</label>
            <section name='gender'>
              <input
                type="radio"
                id="male"
                name="gender"
                value={true}
                checked={form.values.gender === true}
                onChange={() => form.setFieldValue('gender', true)}
              />
              <p htmlFor="Male">Male</p>
            </section>
            <section>
              <input
                type="radio"
                id="female"
                name="gender"
                value={false}
                checked={form.values.gender === false}
                onChange={() => form.setFieldValue('gender', false)}
              />
              <p htmlFor="Female">Female</p>
            </section>
          </div>

          <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
            Update
          </button>
        </div>
      </div>

      <hr />
      <ul className="nav nav-tabs container mb-4">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Order history
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link favourite" href="#">
            Favourite
          </a>
        </li>
      </ul>
      <Table columns={columns} dataSource={dataSource} onChange={handleChange} />
    </form>
  )
}

export default Profile