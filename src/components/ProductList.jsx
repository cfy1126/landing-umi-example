import React from 'react';
import ProductCard from './ProductCard';



const ProductList = ({ level }) => {

  return (
    <div className='home-page-wrapper content0-wrapper'>
      <div className='home-page content0'>
        {level !== 2 && <div className='title-wrapper'>
          <h1>一级分类</h1>
        </div>}
        <div className="list-title" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 50 }}>
          <div data-v-c17bef0a="" className="left" style={{ fontSize: 20, paddingLeft: 15, borderLeft: "4px solid #ff8f33" }}>二级分类</div>
          {level !== 2 && <div data-v-c17bef0a="" className="right" style={{
            fontSize: 16,
            cursor: "pointer",
            color: "#fb930d"
          }}>查看更多</div>}
        </div>
        <ProductCard />
      </div>
    </div>
  );
}

export default ProductList;
