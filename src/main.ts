import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import axios from 'axios';
axios.defaults.timeout = 5000; // 默认5s超时
axios.defaults.baseURL = 'http://192.168.48.53:3000/v1/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(function (config) { // 这里的config包含每次请求的内容
    if (config.params && config.params.auth) {
        // 需要登录验证的url 需带params.auth=true
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
axios.interceptors.response.use((res) => {
    if (res.data.code === 301) {
        console.log('未登录');
    } else if (res.data.code !== 200) {
        console.log('返回数据不正常');
    }
    return res;
}, (error) => {
    console.log('promise error:' + error);
    return Promise.reject(error);
});
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
