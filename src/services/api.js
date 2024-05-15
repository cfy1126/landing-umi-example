import { request } from "./axios";

export function fetchProductCategories() {
    return request("get", `/api/product/category`);
}

export function fetchProductInfo() {
    return request("get", `/api/product/info`);
}

export function fetchProductAttach() {
    return request("get", `/api/product/attach`);
}

export function fetchProductDict() {
    return request("get", `/api/product/dict`);
}
