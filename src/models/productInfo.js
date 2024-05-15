// src/models/example.js
import { fetchProductInfo } from '../services/api'; // 假设有一个服务用于异步请求数据


export default {
    namespace: 'productInfo',
    state: {
        data: [],
    },
    effects: {
        *fetchData(_, { call, put }) {
            try {
                const response = yield call(fetchProductInfo); // 调用服务请求数据
                yield put({ type: 'saveData', payload: response.data }); // 将数据保存到状态中
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