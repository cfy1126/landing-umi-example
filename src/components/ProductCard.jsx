import React, { memo } from "react";
import { history, useLocation } from "umi";
import { Row, Col } from "antd";

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
            <div className="content0-block-item jzjgrrupf2c-editor_css">
              <img
                  src={product.product_url}
                  alt=""
                className="content0-block-icon jzjncn210ql-editor_css"
                />
              <h1 className="content0-block-title jzj8xt5kgv7-editor_css">
                {product.name}
              </h1>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
export default memo(ProductCard);
