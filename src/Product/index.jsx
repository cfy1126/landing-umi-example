import React, { Component } from 'react';
import ProductList from '../Home/ProductList';
import { Feature00DataSource } from '../Home/data.source';
import SurveyComponent from './SurveyComponent';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }
  render() {
    const { isMobile } = this.state;

    return (
      <>
        <SurveyComponent />
        <ProductList
          id="Feature0_0"
          key="Feature0_0"
          dataSource={Feature00DataSource}
          isMobile={isMobile}
          level={2}
        />
        <ProductList
          id="Feature0_0"
          key="Feature0_0"
          dataSource={Feature00DataSource}
          isMobile={this.state.isMobile}
          level={2}
        />,
        <ProductList
          id="Feature0_0"
          key="Feature0_0"
          dataSource={Feature00DataSource}
          isMobile={this.state.isMobile}
          level={2}
        />,
        <ProductList
          id="Feature0_0"
          key="Feature0_0"
          dataSource={Feature00DataSource}
          isMobile={this.state.isMobile}
          level={2}
        />
      </>
    );
  }
}

export default Product;