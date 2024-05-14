import React,{useState,useEffect} from 'react';
import ProductCard from './ProductCard';
import { fetchProductInfo } from '../services/api';

const ProductList = ({ level, title, scenes }) => {
  const [productInfo, setProductInfo] = useState([]);
  useEffect(() => {
    fetchProductInfo().then((res) => {
      setProductInfo(res.data);
    })
  },[])
  return (
    <div className='home-page-wrapper content0-wrapper'>
      <div className='home-page content0'>
        {level !== 2 && <div className='title-wrapper'>
          <h1>{title}</h1>
        </div>}
        {
          scenes.map((item) => {
            return (
              <div className='scenes'>
              <div className="list-title" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 50 }}>
                <div data-v-c17bef0a="" className="left" style={{ fontSize: 20, paddingLeft: 15, borderLeft: "4px solid #ff8f33" }}>{item.name}</div>
                {level !== 2 && <div data-v-c17bef0a="" className="right" style={{
                  fontSize: 16,
                  cursor: "pointer",
                  color: "#fb930d"
                }}>查看更多</div>}
              </div>
              <ProductCard products={productInfo.filter((product)=>product.category_scene === item.code)} />
            </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default ProductList;
