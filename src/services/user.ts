//用户相关请求模块

import request from "@/utils/request";
import qs from 'qs'

interface User { 
    phone: string
    password: string
}
//登录接口
export const login = (data: User) =>{
    return request({
        method: "POST",
        url: "/front/user/login",
        // headers: { "content-type": "application/x-www-form-urlencoded" },
        //如果 data 是普通对象，则Content-Type 是 application/json
        //如果 data 是qs.stringify(data)转换之后得数据：key=value&key=value
        //则Content-Type会被设置为application/x-www-form-urlencoded
        //如果 data 是 FormData 对象，则Content-Type是multipart/from-data
        data: qs.stringify(data),//axios 默认发送得是application/json格式得数据
      });
}
//获取用户信息
export const getUserInfo = () =>{
    return request({
        method: "GET",
        url: "/front/user/getInfo",
        // headers: {
        //     Authorization: store.state.user.access_token
        // }
      });
}