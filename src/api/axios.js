import axios from 'axios'
import store from '@/store/'
import {
    RES_SUC_CODE,
} from '@/config'

const pathRewrite = '/bigdata' // 大数据代理

axios.defaults.baseURL = pathRewrite + '/api'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // 权限认证
        //config.headers.Authorization = store.state.app.token
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.status !== RES_SUC_CODE) {
            console.log('成功！')
        }
        return response
    },
    error => {
        console.log('错误！' + error)
    }
)

export default axios
