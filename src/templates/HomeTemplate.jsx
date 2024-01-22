import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const HomeTemplate = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <footer class="footer">
        <div class="footer-top">
          <div class="container">
            <div class="get-help">
              <div class="title">
                <h1 class="title-text">GET HELP</h1>
              </div>
              <div class="content">
                <a href="#" class="content-text">Contact us</a>
                <a href="#" class="content-text">Shopping</a>
                <a href="#" class="content-text">NIKEID</a>
                <a href="#" class="content-text">Nike+</a>
              </div>
            </div>
            <div class="line"></div>
            <div class="orders">
              <div class="title">
                <h1 class="title-text">ORDERS</h1>
              </div>
              <div class="content">
                <a href="#" class="content-text">Payment options</a>
                <a href="#" class="content-text">Shipping and delivery</a>
                <a href="#" class="content-text">Returns</a>
              </div>
            </div>
            <div class="line"></div>
            <div class="register">
              <div class="title">
                <h1 class="title-text">REGISTER</h1>
              </div>
              <div class="content">
                <p class="content-text">
                  Create one account to manage everything you do with Nike, from
                  your shopping preference to your Nike+ activity
                </p>
                <a href="#" class="content-link"><span>Learn more</span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <div class="sign-up">
              <div class="title">
                <h1 class="title-text">EMAIL SIGN UP</h1>
              </div>
              <div class="content">
                <p class="content-text">
                  Be the first to know about new products and special offers
                </p>
                <a href="#" class="content-link"><p>Sign up now</p></a>
              </div>
            </div>
            <div class="line"></div>
            <div class="gift-cards">
              <div class="title">
                <h1 class="title-text">GIFT CARDS</h1>
              </div>
              <div class="content">
                <p class="content-text">Give the gift chat always fits</p>
                <a href="#" class="content-link"><p>View cards</p></a>
              </div>
            </div>
            <div class="line"></div>
            <div class="stores">
              <div class="title">
                <h1 class="title-text">STORES NEAR YOU</h1>
              </div>
              <div class="content">
                <p class="content-text">
                  Locate a Nike retail store or authorized retailer.
                </p>
                <a href="#" class="content-link"><p>Search</p></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomeTemplate