import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../assets/scss/pages/home.scss'
import imageLogo from '../assets/imgs/Logo.png'
import { ACCESS_TOKEN, USER_LOGIN, USER_PROFILE } from '../util/config'
import { history } from '../index'

const Header = () => {

  const { userLogin } = useSelector(state => state.userReducer);
  const { cart } = useSelector(state => state.productReducer);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userLogin);

  
  useEffect(() => {
    // Kiểm tra nếu không tồn tại token, userLogin, userProfile, thì hiển thị Login và Register
    if (!localStorage.getItem('accessToken') && !localStorage.getItem('userLogin') && !localStorage.getItem('userProfile')) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(!!userLogin);
    }
  }, [userLogin]);
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(USER_PROFILE);
    setIsLoggedIn(false);
    history.push('/login');
  };
  const renderLogin = () => {
    if (isLoggedIn) {
      return (
        <>
          <div className="cart">
            <NavLink className='text-white' to='/cart'>
              <i className="fa fa-cart-plus"></i><span className='text-white'> ({cart?.length})</span>
            </NavLink>
          </div>
          <NavLink className='text-white mx-2' to='/profile'>Welcome!! {userLogin.email}</NavLink>
          <div className="logout">
            <button className='btn text-white' onClick={handleLogout}>Logout</button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="login">
            <NavLink className='nav-link' to='/login'>Login</NavLink>
          </div>
          <div className="register">
            <NavLink className='nav-link' to='/register'>Register</NavLink>
          </div>
        </>
      );
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <NavLink className='' to='/'>
            <img src={imageLogo} alt='...' />
          </NavLink>
        </div>
        <div className="options">
          <div className="search">
            <NavLink className='search' to='/search'>
              <i class="fa fa-search"></i> Search
            </NavLink>
          </div>
          {renderLogin()}

        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white">
        <div className="container-fluid container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item nav-link-home">
                <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to='/'>Men</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/'>Woman</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/'>Kid</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/'>Sport</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header