
import axios, { AxiosRequestConfig } from "axios";

export function request(config: AxiosRequestConfig){

    //1.创建axios实例
    const instance = axios.create({ //create里写的是公共的参数
      baseURL: 'http://152.136.185.210:8000/api/w6',
      timeout: 5000
    })

    //2.axios的拦截器
    instance.interceptors.request.use(config => {
      return config; //拦截之后要返回回去，否则就被拦截请求失败了
    }, err => {
      console.log(err);
    })

    instance.interceptors.response.use(res => {
      // console.log(res);
      return res.data; //拦截之后要返回回去，只返回data就可以
    }, err => {
      console.log(err);
    })

    //3.发送真正的网络请求
    return instance(config) //instance()相当于axios()
  }

// import axios from "axios";
//
// // Full config:  https://github.com/axios/axios#request-config
// // axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//
// let config = {
//   // baseURL: process.env.baseURL || process.env.apiUrl || ""
//   // timeout: 60 * 1000, // Timeout
//   // withCredentials: true, // Check cross-site Access-Control
// };
//
// const _axios = axios.create(config);
//
// _axios.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     return config;
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );
//
// // Add a response interceptor
// _axios.interceptors.response.use(
//   function(response) {
//     // Do something with response data
//     return response;
//   },
//   function(error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
//
// export default {
//   install:function(app:any, options:any) {
//     // 添加全局的方法
//     app.config.globalProperties.axios = _axios;
//     // 添加全局的方法
//     app.config.globalProperties.$translate = (key: any) => {
//       return key
//     }
//   }
// }
