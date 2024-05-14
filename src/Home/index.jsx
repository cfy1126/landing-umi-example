import React, { useEffect } from 'react';
import Banner from './Banner';
import { connect } from 'umi';
import ProductList from '../components/ProductList';
import './less/antMotionStyle.less';


const Home = ({ productCategory, dispatch }) => {
  const { data } = productCategory;
  const systems = data.filter((item) => item.level === '1');
  useEffect(() => {
    // 组件挂载时触发异步请求
    dispatch({ type: 'productCategory/fetchData' });
  }, []);
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
              scenes={data.filter((scene) => scene.parent_name === item.name)}
              id={
                item.code
              }
            />
          )
        })
      }
    </div>
  );
}

export default connect(({ productCategory }) => ({ productCategory }))(Home);