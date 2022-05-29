import axios from 'axios';
import config from '@/api/config';
//获取根地址
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //设置根地址
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        };
        return config;
    }
    //设置拦截器
    interceptors(instance) {
        instance.interceptors.request.use(config => {
                return config
            },
            error => {
                console.log(error.message)
            });
        instance.interceptors.response.use(response => {
                return response.data
            },
            error => {
                console.log(error.message);
            });
    }
    // 通过request方法返回axios配置好的实例
    request(options) {
        const instance = axios.create();
        options = {
            ...this.getInsideConfig(),
            ...options
        };
        this.interceptors(instance)
        return instance(options)
    }
}



export default new HttpRequest(baseUrl)