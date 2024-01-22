import React from 'react'
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { registerAPI } from '../redux/Reducers/UserReducer';
import '../assets/scss/pages/register.scss'

const Register = () => {

  const dispatch = useDispatch();
  const form = useFormik({
    initialValues:{
      email:'',
      password:'',
      name:'',
      phone:'',
      gender:true
    },
    validate: (values) => {
      const errors = {};

      // Kiểm tra tất cả các trường có được để trống không
      Object.keys(values).forEach((fieldName) => {
        if (!values[fieldName]) {
          errors[fieldName] = `${fieldName} is required`;
        }
      });

      // Kiểm tra định dạng email
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      // Kiểm tra không nhập chữ và kí tự đặc biệt vào trường phone
      if (!/^\d+$/.test(values.phone)) {
        errors.phone = 'Please enter only numbers';
      }

      // Các kiểm tra khác (nếu cần)

      return errors;
    },
    onSubmit:(values)=>{
      if (Object.keys(form.errors).length === 0) {
        const actionAsync = registerAPI(values);
        dispatch(actionAsync);
      }
    },
  })

  return (
    <form className='container mt-4' onSubmit={form.handleSubmit}>
      <h2>Register</h2>
      <hr />
      <div className="row container">
        <div className="input-left col-6">
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <input onChange={form.handleChange} onBlur={form.handleBlur}
            value={form.values.email}
            type="text" 
            className="form-control bg-light" 
            placeholder="email" 
            name="email"/>
            {form.touched.email && form.errors.email ? (
              <div className="error-message text-danger">{form.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group mt-4">
            <label htmlFor="password">Password</label>
            <input onChange={form.handleChange} onBlur={form.handleBlur}
            value={form.values.password}
            type="password" 
            className="form-control bg-light" 
            placeholder="password"
            name="password"/>
            {form.touched.password && form.errors.password ? (
              <div className="error-message text-danger">{form.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group mt-4">
            <label htmlFor="confirmPassword">Password Confirm</label>
            <input onChange={form.handleChange}
            type="password" 
            className="form-control bg-light" 
            placeholder='password confirm' 
            name='confirmPassword'/>
          </div>
        </div>

        <div className="input-right col-6">
          <div className="form-group mt-3">
            <label htmlFor="name">Name</label>
            <input onChange={form.handleChange} onBlur={form.handleBlur}
            value={form.values.name}
            className="form-control bg-light" 
            placeholder='name' 
            name='name'/>
            {form.touched.name && form.errors.name ? (
              <div className="error-message text-danger">{form.errors.name}</div>
            ) : null}
          </div>
          <div className="form-group mt-4">
            <label htmlFor="phone">Phone</label>
            <input onChange={form.handleChange} onBlur={form.handleBlur}
            value={form.values.phone}
            type="text" 
            className="form-control bg-light" 
            placeholder='phone' 
            name='phone'/>
            {form.touched.phone && form.errors.phone ? (
              <div className="error-message text-danger">{form.errors.phone}</div>
            ) : null}
          </div>
          <div className="gender form-group mt-5">
            <label htmlFor="gender">Gender</label>
            <section name='gender'>
              <input onChange={form.handleChange} 
              type="radio" 
              id="Male" 
              name="Gender" 
              value="true"/>
              <p htmlFor="Male">Male</p>
            </section>
            <section>
              <input onChange={form.handleChange} 
              type="radio" 
              id="Female" 
              name="Gender" 
              value="false"/>
              <p htmlFor="Female">Female</p>
            </section>
          </div>

          <button className='btn-register text-white mt-4 border-0 shadow' type='submit'>
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  )
}

export default Register