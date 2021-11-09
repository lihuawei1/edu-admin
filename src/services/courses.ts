
//课程相关请求模块
import request from "@/utils/request";

export const getQueryCourses = (data:any) =>{
    return request({
        method: "POST",
        url: "/boss/course/getQueryCourses",
        data
      });
}

export const changeState = (params:any) =>{
  return request({
      method: "GET",
      url: "/boss/course/changeState",
      params
    });
}

export const saveOrUpdateCourse = (params:any) =>{
  return request({
      method: "GET",
      url: "/boss/course/saveOrUpdateCourse",
      params
    });
}

export const uploadCourseImage = (data:any) =>{
  //该接口要求的请求数据类型是：multipart/form-data
  //所以需要提交FormData数据对象
  return request({
      method: "POST",
      url: "/boss/course/upload",
      data
    });
}