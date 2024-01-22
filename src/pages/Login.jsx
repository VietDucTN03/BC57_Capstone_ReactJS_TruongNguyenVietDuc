import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux'
import { loginAPIAction } from '../redux/Reducers/UserReducer';

import { history } from '../index';
import FacebookLogin from 'react-facebook-login'
import axios from 'axios';
import '../assets/scss/pages/login.scss'

const Login = () => {

  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validate: (values) => {
      const errors = {};

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email format';
      }

      if (!values.email) {
        errors.email = 'Information cannot be left blank!!';
      }
      if (!values.password) {
        errors.password = 'Information cannot be left blank!!';
      }

      return errors;
    },

    onSubmit: (values) => {
      const actionAsync = loginAPIAction(values);
      dispatch(actionAsync);
    }
  })

  const responseFacebook = (response) => {
    axios({
      url: "https://shop.cyberlearn.vn/api/Users/facebookLogin",
      method: 'POST',
      data: {
        facebookToken: response.accessToken
      }

    }).then((res) => {
      localStorage.setItem('accessToken', res.data.content.accessToken);
      console.log(res);

      alert('Login to Facebook successfully!')
      history.push('/profile')
    })
  };

  return (
    <form action="" className='container mt-4' onSubmit={form.handleSubmit}>
      <h2>Login</h2>
      <hr />
      <div className='mx-auto w-50'>
        <div className="form-group mb-3">
          <p htmlFor="email" className='m-1 text-secondary'>Email</p>
          <input type="email" onBlur={form.handleBlur} className={`form-control ${form.errors.email && form.touched.email ? 'is-invalid' : ''}`} id="email" name='email' placeholder="name@example.com" onChange={form.handleChange} />
          {form.errors.email && form.touched.email && (
            <div className="invalid-feedback" style={{ color: 'red' }}>
              {form.errors.email}
            </div>
          )}
        </div>
        <div className="form-group">
          <p htmlFor="password" className='m-1 text-secondary'>Password</p>
          <input type="password" onBlur={form.handleBlur} className={`form-control ${form.errors.password && form.touched.password ? 'is-invalid' : ''}`} id="password" name='password' placeholder="Password" onChange={form.handleChange} />
          {form.errors.password && form.touched.password && (
            <div className="invalid-feedback" style={{ color: 'red' }}>
              {form.errors.password}
            </div>
          )}
        </div>
        <div className="form-group typesubmitLogin mb-2">
          <div className="row">
            <div className="col-8">
              <h6 className='mt-3 registerNow text-primary' onClick={() => {
                history.push('/register');
              }}>Register now?</h6>
            </div>
            <div className="col-4 submitLogin">
              <button type='submit' className='btn mt-2'>Login</button>
            </div>
          </div>
        </div>
        <div className="form-group text-center loginFacebook">
          <FacebookLogin appId="1694735714348158" autoLoad={false} fields="name,email,picture" callback={responseFacebook}/>
        </div>
      </div>
    </form>
  )
}

export default Login