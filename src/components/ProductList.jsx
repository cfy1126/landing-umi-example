import React, { useEffect } from 'react';
import { Link, connect, useLocation } from 'umi'
import ProductCard from './ProductCard';

const ProductList = ({ id = '', vId = '', name='', tId='',productInfo, dispatch }) => {
  console.log(name);
  const { data: products } = productInfo;
  let dataSources = [];
  if(tId && tId !== 'all'){
    dataSources = products.filter(item => item.category_scene === vId && item.category_output === tId)
  }else{
    dataSources = products.filter(item => item.category_scene === vId);
  }
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    dispatch({ type: 'productInfo/fetchData' });
  }, [])
  return (
    <>
      {
        dataSources.length > 0 &&
        <div className='scenes'>
          <div className="list-title" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 50 }}>
            <div data-v-c17bef0a="" className="left" style={{ fontSize: 20, paddingLeft: 15, borderLeft: "4px solid #1890FF" }}>{name}</div>
            {
              pathname=== '/' &&
              <div data-v-c17bef0a="" className="right" style={{
                fontSize: 16,
                cursor: "pointer",
              }}><Link to={`/product?id=${id}&vId=${vId}`}>查看更多</Link></div>
            }
          </div>
          <ProductCard products={dataSources} />
        </div>
      }
    </>
  );
}

export default connect(({ productInfo }) => ({ productInfo }))(ProductList);
