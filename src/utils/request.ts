import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui';
import router from '@/router'
import qs from 'qs'
const request = axios.create({
    //配置选项
    //baseUrl
    //timeout
})

function redirectLogin () {
    router.push({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

function refreshToken(){
  return axios.create()({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
            refreshtoken:store.state.user.refresh_token
        })
    })
}
//请求拦截

request.interceptors.request.use(function (config: any) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if(user && user.access_token){
        config.headers.Authorization = user.access_token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
//响应拦截
let isRfreshing = false//控制刷新token状态
let requests:any = [] //存储刷新token后的401请求
request.interceptors.response.use(function (response) {//所有2xx开头的状态码走这里
    // 对响应数据做点什么
    return response;
  }, async function (error) {//超出2xx开头的状态码走这里
    // 对响应错误做点什么
    if (error.response) {// 请求收到响应了，但服务器响应的状态码不在 2xx 范围内
        const { status } = error.response
        if(status === 400) { 
            Message.error('请求参数错误')
        } else if (status === 401) {
            //token 无效 （没有提供token token 是无效的 token过期了）
            // 如果有refresh_token 则尝试使用refresh_token，如果没有重新access_token
            if(!store.state.user) {
                redirectLogin()
                return Promise.reject(error)
            }
            if(!isRfreshing){
             isRfreshing = true
            //尝试刷新获取新的token
            return refreshToken().then((res:any) =>{
                if(!res.data.success) {
                    throw new Error('刷新token失败')
                }
                 //刷新token成功了
                store.commit('setUser', res.data.content)
                //把request队列中的请求重新发出去
                console.log(requests,'requests')
                requests.forEach((cb:any) => cb())
                //重置requests 数组
                requests = []
                return request(error.config)
            }).catch(err =>{
                store.commit('setUser', null)
                redirectLogin()
                return Promise.reject(error)
            }).finally(()=>{
                isRfreshing = false
            })
            }
           //刷新状态下，把请求挂起到requests数组中
           return new Promise(resolve =>{
            requests.push(() =>{
                   resolve(request(error.config)) 
               })
           })
        // try {
        //     const { data }:any = await axios.create()({
        //         method: 'POST',
        //         url: '/front/user/refresh_token',
        //         data: qs.stringify({
        //             refreshtoken:store.state.user.refresh_token
        //         })
        //     })
        //     // 成功了->把本次失败的请求重新发出去
        //     // 把刷新拿到的新的access_token 更新到容器和本地存储中
        //     store.commit('setUser', data.content)
        //     console.log(error.config)
        //     return request(error.config)
        // } catch (err) {
        //     // 失败了 -> 把本次失败的请求重新发送出去
        //     store.commit('setUser', null)
        //     redirectLogin()
        // }
        } else if (status === 403) {
            Message.error('没有权限,请联系管理员')
        } else if (status === 404) {
            Message.error('请求资源不存在')
        } else if (status >= 500) {
            Message.error('服务端错误,请联系管理员')
        }
      } else if (error.request) {//请求发出去没有收到响应 断网或者请求超时
        Message.error('请求超时,请刷新重试')
      } else {//在设置请求时发生了一些事情，触发了一个错误
        // Something happened in setting up the request that triggered an Error
        Message.error(`请求失败：${error.message}`)
      }
    //把请求失败的错误对象继续抛出，扔给下一个上一个调用者
    return Promise.reject(error);
  })

  

export default request