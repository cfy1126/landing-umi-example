// src/models/example.js
import { getLocale } from "umi";
import { fetchProductAttach } from "../services/api"; // 假设有一个服务用于异步请求数据
import { getLaguage } from "../utils/utils";

export default {
  namespace: "productAttach",
  state: {
    data: [],
  },
  effects: {
    *fetchData(_, { call, put }) {
      try {
        const response = yield call(fetchProductAttach); // 调用服务请求数据
        const locale = getLaguage(getLocale());
        let result = response.data.filter((item) => item.language === locale);
        yield put({ type: "saveData", payload: result }); // 将数据保存到状态中
      } catch (error) {
        // 处理异常
        console.log(error);
      }
    },
  },
  reducers: {
    saveData(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
