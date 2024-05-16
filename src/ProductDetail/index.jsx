import React, { useState, useEffect } from "react";
import { connect, useLocation, useIntl } from "umi";
import {
  Card,
  Breadcrumb,
  Typography,
  Select,
  Space,
  List,
  Skeleton,
} from "antd";

const { Title, Text } = Typography;

/**
 *
 * @param {
 * systemDict: 系统字典
 * productInfo: 产品信息
 * productCategory: 产品分类
 * productAttach: 产品附件
 * } param0
 */

function ProductDetail({
  systemDict,
  productInfo,
  productCategory,
  productAttach,
  dispatch,
}) {
  const { formatMessage } = useIntl();
  const location = useLocation();
  let { id, pId } = location.query;
  const { data: categories } = productCategory;
  const { data: products } = productInfo;
  const { data: attachs } = productAttach;
  const { data: types } = systemDict;
  // 选择文档类型
  const [activeType, setActiveType] = useState("");

  const currentAttachs = attachs.filter((item) => item.product_code === pId);
  const groupedData = currentAttachs.reduce((acc, curr) => {
    const category = curr.attach_category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(curr);
    return acc;
  }, {});
  const singularSys = categories.find((item) => item.code === id) || {};
  const singularProduct = products.find((item) => item.code === pId) || {};
  useEffect(() => {
    dispatch({ type: "productCategory/fetchData" });
    dispatch({ type: "productInfo/fetchData" });
    dispatch({ type: "productAttach/fetchData" });
    dispatch({ type: "systemDict/fetchData" });
  }, []);
  const handleAttachType = (id) => {
    let data = types.find((item) => item.code === id && item.type === "2");
    return data.name || "";
  };
  const renderAttach = () => {
    let arr = [];
    for (let i in groupedData) {
      let singularType = types.find((item) => item.code === i) || {};
      let filteredObj = {};
      if (activeType) {
        const filteredKeys = Object.keys(groupedData);
        filteredKeys.forEach((key) => {
          if (key === activeType) {
            filteredObj[key] = JSON.parse(JSON.stringify(groupedData[key]));
          }
        });
      } else {
        filteredObj = JSON.parse(JSON.stringify(groupedData));
      }
      if (filteredObj && filteredObj[i] && filteredObj[i].length > 0) {
        arr.push(
          <Card type="inner" title={singularType.name} key={singularType.name}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={filteredObj[i]}
              renderItem={(item) => (
                <List.Item
                  key={item.attach_name}
                  actions={[
                    <a
                      href={item.attach_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatMessage({ id: "page.productDetail.download" })}
                    </a>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      title={<div>{item.attach_name}</div>}
                      description={
                        <Space>
                          <Text strong>
                            {formatMessage({ id: "page.productDetail.type" })}：
                          </Text>
                          <Text>{handleAttachType(item.attach_type)}</Text>
                          <Text>|</Text>
                          <Text strong>
                            {formatMessage({
                              id: "page.productDetail.language",
                            })}
                            ：
                          </Text>
                          <Text>{item.attach_language}</Text>
                          <Text>|</Text>
                          <Text strong>
                            {formatMessage({ id: "page.productDetail.size" })}：
                          </Text>
                          <Text>{item.attach_size}</Text>
                          <Text>|</Text>
                          <Text strong>
                            {formatMessage({
                              id: "page.productDetail.version",
                            })}
                            ：
                          </Text>
                          <Text>{item.attach_version}</Text>
                          <Text>|</Text>
                          <Text strong>
                            {formatMessage({ id: "page.productDetail.time" })}：
                          </Text>
                          <Text>{item.update_time}</Text>
                        </Space>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        );
      }
    }
    return arr;
  };

  const keyTypeArr = Object.keys(groupedData) || [];
  return (
    <Card
      title={
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            {" "}
            {formatMessage({ id: "menu.products.information" })}
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">{singularSys.name}</Breadcrumb.Item>
          <Breadcrumb.Item href="">{singularProduct.name}</Breadcrumb.Item>
        </Breadcrumb>
      }
      bordered={true}
      style={{
        width: `92%`,
        margin: `0 auto`,
      }}
    >
      <Title level={2}>{singularProduct.name}</Title>
      <div className="select-group" style={{ textAlign: `right` }}>
        <Space>
          <Select
            placeholder="请选择资料类型"
            style={{ width: 160 }}
            onChange={(value) => setActiveType(value)}
            options={keyTypeArr.map((item) => {
              let singularType =
                types.find(
                  (element) => element.code === item && element.type === "1"
                ) || {};
              return {
                value: item,
                label: singularType.name,
              };
            })}
          />
          <Select
            placeholder="请选择语言"
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              {
                value: "zh",
                label: "简体中文",
              },
              {
                value: "en",
                label: "English",
              },
            ]}
          />
        </Space>
      </div>
      <div
        className="card-group"
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {renderAttach()}
      </div>
    </Card>
  );
}

export default connect(
  ({ systemDict, productInfo, productCategory, productAttach }) => ({
    systemDict,
    productInfo,
    productCategory,
    productAttach,
  })
)(ProductDetail);
