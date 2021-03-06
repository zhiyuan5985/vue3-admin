import axios from 'axios';
import Message from 'element-ui';
import { getToken, getUserName } from '@/utils/token';

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
// 创建axios，赋给变量service
const service = axios.create({
  baseURL: BASEURL, // 拼出来是 http://192.168.31.102:8080/devApi
  timeout: 10000,
});

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers['Tokey'] = getToken();
    config.headers['UserName'] = getUserName('username');
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return Promise.resolve(response);
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
