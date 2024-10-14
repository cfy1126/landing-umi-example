import React, { useState } from "react";
import { Modal, Tabs, Input } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { connect } from "umi";
import styles from "./ProductSearch.less";
const { Search } = Input;

function ProductSearch({ productCategory, productInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: categories } = productCategory || { data: [] };
  const { data: products } = productInfo || { data: [] };

  const [searchCategories, setSearchCategories] = useState(categories);
  const [searchProducts, setSearchProducts] = useState(products);

  const CategoryContent = ({ item }) => {
    return (
      <>
        <h3>{item.name}</h3>
        {searchCategories
          .filter(
            (_item) =>
              _item.parent_code !== null &&
              _item.parent_code.split(",").includes(item.code)
          )
          .map((element) => {
            const filteredProducts = searchProducts.filter(
              (product) =>
                product.category_system === item.code &&
                product.category_scene === element.code
            );

            return (
              <React.Fragment key={element.id}>
                <div
                  className={styles.second_title}
                  style={{
                    display: filteredProducts.length ? "block" : "none",
                  }}
                >
                  {element.name}
                </div>
                <ul className={styles.product_list}>
                  {filteredProducts.map((product) => {
                    return (
                      <li key={product.id}>
                        <a href={`/productDetail?id=${product.code}`}>
                          {product.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </React.Fragment>
            );
          })}
      </>
    );
  };

  const TabsItems = searchCategories
    .filter((item) => item.level === "1")
    .map((item) => {
      return (
        <Tabs.TabPane tab={item.name} key={item.id}>
          <CategoryContent item={item} />
        </Tabs.TabPane>
      );
    });

  const onSearch = (value) => {
    if (!value) {
      setSearchProducts(products);
      setSearchCategories(categories);
      return;
    }
    const input = value.toLowerCase().trim();
    const matches = products.filter((product) =>
      product.name.toLowerCase().includes(input)
    );
    if (matches.length === 0) {
      setSearchCategories([]);
    }else{
      setSearchCategories(categories);
    }
    setSearchProducts(matches);
  };
  return (
    <>
      <MenuOutlined onClick={() => setIsModalOpen(true)} />
      <Modal
        height={500}
        style={{
          top: 80,
        }}
        destroyOnClose={true}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
          setSearchProducts(products);
        }}
        footer={null}
        bodyStyle={{
          height: "540px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          padding: 16,
        }}
      >
        <Search
          placeholder="input search text"
          enterButton
          allowClear
          onSearch={onSearch}
        />
        <Tabs tabPosition="left" style={{ flexGrow: 1 }}>
          <Tabs.TabPane tab="ALL" key="all">
            {searchCategories
              .filter((object) => object.level === "1")
              .map((item) => {
                return <CategoryContent key={item.id} item={item} />;
              })}
          </Tabs.TabPane>
          {TabsItems}
        </Tabs>
      </Modal>
    </>
  );
}

export default connect(({ productInfo, productCategory }) => ({
  productInfo,
  productCategory,
}))(ProductSearch);
