import React, { useState, useEffect, useMemo } from "react";
import { connect, useLocation, useIntl } from "umi";
import {
  Card,
  Breadcrumb,
  Typography,
  Select,
  Space,
  List,
  Skeleton,
  Descriptions,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { getMobileOperatingSystem } from "@/utils/utils";
import useMobile from "@/hooks/useMobile";
import android from "@/assets/android.png";
import ios from "@/assets/ios.png";
import QR from "@/assets/livoltek-QRcode.png";
import styles from "./index.less";

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
  let { id } = location.query;
  const { data: categories } = productCategory || { data: [] };
  const { data: products } = productInfo || { data: [] };
  const { data: attachs } = productAttach || { data: [] };
  const { data: types } = systemDict || { data: [] };
  // 选择文档类型
  const [activeType, setActiveType] = useState("");

  const singularProduct = products.find((item) => item.code === id) || {};
  const singularSys =
    categories.find((item) => item.code === singularProduct.category_system) ||
    {};

  const currentAttachs = useMemo(
    () => attachs.filter((item) => item.product_code.split(",").includes(id)),
    [attachs, id]
  );
  const groupedData = currentAttachs.reduce((acc, curr) => {
    const category = curr.attach_category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(curr);
    return acc;
  }, {});
  useEffect(() => {
    dispatch({ type: "productCategory/fetchData" });
    dispatch({ type: "productInfo/fetchData" });
    dispatch({ type: "productAttach/fetchData" });
    dispatch({ type: "systemDict/fetchData" });
  }, []);

  const isMobile = useMobile();

  // const handleAttachType = (id) => {
  //   let data =
  //     types.find((item) => item.code === id && item.type === "2") || {};
  //   return data.name || "";
  // };
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
      if (filteredObj[i] && filteredObj[i].length > 0) {
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
                      <DownloadOutlined style={{ fontSize: 28 }} />
                      {/* {formatMessage({ id: "page.productDetail.download" })} */}
                    </a>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      title={<div>{item.attach_name}</div>}
                      description={
                        <Space>
                          <Descriptions
                            labelStyle={{ fontWeight: 550 }}
                            layout={isMobile ? "vertical" : "horizontal"}
                          >
                            <Descriptions.Item
                              label={formatMessage({
                                id: "page.productDetail.type",
                              })}
                            >
                              {singularType.name}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label={formatMessage({
                                id: "page.productDetail.language",
                              })}
                            >
                              {item.attach_language}
                            </Descriptions.Item>
                          </Descriptions>
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

  useEffect(() => {
    dispatch({
      type: "menu/saveMenuSelectKey",
      payload: `${singularProduct.category_system}-${singularProduct.category_scene}`,
    });
  }, [products]);
  const keyTypeArr = Object.keys(groupedData) || [];

  const ORcode = useMemo(() => {
    let mark = getMobileOperatingSystem();
    if (mark === "iOS") {
      return ios;
    } else if (mark === "Android") {
      return android;
    } else {
      return QR;
    }
  }, []);
  return (
    <>
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            margin: 20,
          }}
        >
          <img style={{ width: 80 }} src={ORcode} alt="" />
          {formatMessage({ id: "page.productDetail.prompt.QRcode" })}
          <span></span>
        </div>
      )}
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
              placeholder={formatMessage({
                id: "page.productDetail.prompt.type",
              })}
              style={{ width: 160 }}
              onChange={(value) => setActiveType(value)}
              options={[
                {
                  value: "",
                  label: "All",
                },
                ...keyTypeArr.map((item) => {
                  let singularType =
                    types.find(
                      (element) => element.code === item && element.type === "1"
                    ) || {};
                  return {
                    value: item,
                    label: singularType.name,
                  };
                }),
              ]}
            />
            {/* <Select
              placeholder={formatMessage({
                id: "page.productDetail.prompt.language",
              })}
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
            /> */}
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
    </>
  );
}

export default connect(
  ({ systemDict, productInfo, productCategory, productAttach, menu }) => ({
    systemDict,
    productInfo,
    productCategory,
    productAttach,
    menuSelectKey: menu ? menu.menuSelectKey : undefined,
  })
)(ProductDetail);

/**
 * 对象常用方法
 * 1. Object.hasOwnProperty(key) 判断对象是否有某个属性
 * 2. Object.keys(obj) 返回对象的属性数组
 * 3. Object.values(obj) 返回对象的值数组
 * 4. Object.entries(obj) 返回对象的键值对数组
 */
