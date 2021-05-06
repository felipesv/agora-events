import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingButton from './FloatingButton';
import { isLoggedIn } from '../utils/authUtils';

const Layout = ({ children }) => (
  <div className='App'>
    <Header />
    { children }
    { isLoggedIn() ? <FloatingButton/> :  <></> }
    <Footer />
  </div>
);

export default Layout;
