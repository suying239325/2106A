/**
 * axios二次封装
 */

import Axios from 'axios'
import encConfig from './env'
import { Message } from 'element-ui'

//创建axios实例
const service = Axios.create({
    //设置基地址
    baseURL: encConfig.prod.baseURL,
    timeout: 5000
})

//创建请求拦截器
service.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//创建响应拦截器
service.interceptors.response.use(
    (res) => {
        console.log('res:::', res)
        const {
            meta: { msg, status: code },
            data: result
        } = res.data
        const successCodeArr = [200, 201, 204]
        if (successCodeArr.includes(code)) {
            Message({
                message: msg,
                type: 'success'
            })

            if (res.config.url === '/login') {
                sessionStorage.setItem('token', result.token)
            }

            return result
        }

        Message({
            message: msg,
            type: 'error'
        })

        return Promise.reject(msg)
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service
