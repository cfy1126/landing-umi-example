// src/models/example.js
import { getLocale } from "umi";
import { fetchProductDict } from "../services/api"; // 假设有一个服务用于异步请求数据
import { getLaguage,handleLanguage } from "../utils/utils";
import data from "/data/system_dict.json";

export default {
  namespace: "systemDict",
  state: {
    data: data.result,
  },
  effects: {
  //   *fetchData(_, { call, put }) {
  //     try {
  //       const response = yield call(fetchProductDict); // 调用服务请求数据
  //       const locale = getLaguage(getLocale());
  //       let result = response.data.filter((item) => item.language === locale);
  //       yield put({ type: "saveData", payload: result }); // 将数据保存到状态中
  //     } catch (error) {
  //       // 处理异常
  //       console.log(error);
  //     }
  //   },
  *changeLanguage({ payload }, { call, put, select }) {
    // 获取当前的数据
    const data = yield select((state) => state.systemDict.data);
    // 根据新的语言对数据进行处理
    const newData = handleLanguage(data, payload);
    // 将处理后的数据保存到状态中
    yield put({ type: "saveData", payload: newData });
  },
  },
  reducers: {
    saveData(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
