import axios from 'axios'
export const baseURL = 'http://47.121.199.127:8080/'
// export const baseURL='http://127.0.0.1:8080/'
// 创建axios实例
const service = axios.create({
    baseURL: baseURL,// api的base_url
    timeout: 5000 // 请求超时时间
  });
// 请求拦截器
service.interceptors.request.use(
    config => {
      // 可以在这里添加请求头等信息
      // 例如：config.headers['Authorization'] = 'Bearer your-token';
      return config;
    },
    error => {
      // 请求错误处理
      console.log(error); // for debug
      Promise.reject(error);
    }
  );
   
  // 响应拦截器
  service.interceptors.response.use(
    response => {
      // 对响应数据做处理，例如只返回data部分
      const res = response.data;
      // 如果返回的状态码为200，说明成功，可以直接返回数据
      if (res.code === 0 || res.code === 200) {
        return res;
      } else {
        // 其他状态码都当作错误处理
        // 可以在这里对不同的错误码进行不同处理
        return Promise.reject({
          message: res.message || 'Error',
          status: res.code
        });
      }
    },
    error => {
      // 对响应错误做处理
      console.log('err' + error); // for debug
      return Promise.reject(error);
    }
  );
   
  export default service;
  


   
