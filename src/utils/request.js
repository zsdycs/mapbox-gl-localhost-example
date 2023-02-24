import axios from 'axios';
import { Loading } from 'element-ui';
let loading; // 定义loading变量

function startLoading() {
  // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
function endLoading() {
  // 使用Element loading-close 方法
  loading.close();
}
// create an axios instance
const service = axios.create({
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    startLoading();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // if (res.code !== 'EP_000000') {
    //   endLoading()
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    // }
    endLoading();

    return res;
  },
  (error) => {
    endLoading();
    return Promise.reject(error);
  }
);

export default service;
