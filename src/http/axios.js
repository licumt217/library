
import axios from 'axios'
// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.baseURL = '';

let baseURL = 'http://localhost:3000/';


// http request 拦截器
axios.interceptors.request.use(
    config => {

        config.url = baseURL + config.url
        // config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        return config;
    },
    err => {
        console.log(55555,err)
        return Promise.reject(err);
    });
// http response 拦截器
axios.interceptors.response.use(
    response => {
        console.log(222)


        let data=response.data;

        if (data.isSuccess === '0' ) {
            return Promise.resolve(data.data);
        }else {
            return Promise.reject(data.errorMsg);
        }
    },
    error => {

        let errorMsg="请求异常"

        if(error.response.status===404){
            errorMsg="请求地址不存在"
        }

        return Promise.reject(errorMsg)

    }
);

export default axios;
