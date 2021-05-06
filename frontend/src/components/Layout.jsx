import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingButton from './FloatingButton';
import { isLoggedIn } from '../utils/authUtils';
import '@stylesComponents/Layout.scss';

const Layout = ({ children }) => (
  <div className='App'>
    <Header />
    <div className="main-content">
      { children }
      { isLoggedIn() ? <FloatingButton/> :  <></> }
    </div>
    <Footer />
  </div>
);

export default Layout;
