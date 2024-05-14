import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import { getLocale } from 'umi';
import ProductList from '../components/ProductList';
import './less/antMotionStyle.less';
import { fetchProductCategories } from '../services/api';


const Home = () => {
  const [productCategories, setProductCategories] = useState([]);
  useEffect(() => {
    fetchProductCategories().then((res) => {
      let locale = getLocale();
      if (locale.indexOf('zh') !== -1) {
        locale = 'zh';
      } else if (locale.indexOf('en') !== -1) {
        locale = 'en';
      } else {
        locale = 'zh'
      }
      let result = res.data.filter((item) => item.language === locale);
      setProductCategories(result);
    });
  }, []);
  const systems = productCategories.filter((item) => item.level === '1');
  return (
    <div className="templates-wrapper">
      <Banner />
      {
        systems.map((item) => {
          return (
            <ProductList
              level={1}
              key={item.code}
              title={item.name}
              scenes={productCategories.filter((scene) => scene.parent_name === item.name)}
            />
          )
        })
      }
    </div>
  );
}

export default Home;
