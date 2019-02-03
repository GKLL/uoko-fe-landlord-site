/*
 * @Description: axios网络请求库二次封装
 * @Author: LiuZhen
 * @Date: 2018-09-18 11:49:38
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-25 10:54:30
 */
import axios from 'axios';

const Axios = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// http request请求拦截器(所有请求发送都要执行的操作)
Axios.interceptors.request.use(
  (config) => {
    // 根据环境设置baseURL
    if (process.env.NODE_ENV === 'production') {
      config.baseURL = 'http://api-gateway.uoko.com/pandora/webapi';
      // config.baseURL = 'http://bi.uoko.com:9999/app/webapi/';
    } else if (process.env.NODE_ENV === 'test') {
      config.baseURL = 'http://api-gateway.uoko.com/pandora/webapi';
      // config.baseURL = 'http://bi.uoko.com:9999/app/webapi/';
    } else {
      config.baseURL = 'http://api-gateway.uoko.com/pandora/webapi';
      // config.baseURL = 'http://front-end.testuoko.com:9191/mock/31/webapi';
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

// http response响应拦截器
Axios.interceptors.response.use(
  (response) => {
    // 这里可以做一些响应拦截的操作

    return response;
  }, (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
