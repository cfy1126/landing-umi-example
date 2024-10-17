import React, { memo } from "react";
import { history, useLocation } from "umi";
import { Row, Col } from "antd";
import "./ProductCard.less";

/**
 *
 * @param {
 * id: 产品code
 * }
 */

const ProductCard = ({ products = [] }) => {
  const handleClick = (code) => {
    history.push({
      pathname: "/productDetail",
      query: {
        id: code,
      },
    });
  };
  const location = useLocation();
  const { pathname } = location;
  if (pathname === "/" && products.length > 0) {
    products = products.slice(0, 4);
  }
  return (
    <Row>
      {products.map((product) => {
        return (
          <Col
            key={product.code}
            md={6}
            xs={24}
            className="content0-block"
            onClick={() => handleClick(product.code)}
          >
            <div className="product-container">
              <img
                  src={product.product_url}
                  alt=""
                className=""
                />
              <h3 className="">
                {product.name}
              </h3>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
export default memo(ProductCard);
