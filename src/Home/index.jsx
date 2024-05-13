import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import ProductList from '../components/ProductList';
import './less/antMotionStyle.less';


const Home = () => {
  const children = [
    <Banner
    />,
    <ProductList
      level={1}
    />,
    <ProductList
      level={1}
    />,
    <ProductList
      level={1}
    />
  ];

  return (
    <div className="templates-wrapper">
      {children}
    </div>
  );
}

export default Home;
