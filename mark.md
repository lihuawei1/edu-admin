## 关于Token过期的问题

## access_token
   作用：获取需要授权的接口数据

## expires_in
   作用：access_token 过去时间

## refresh_token
   作用：刷新获取新的 access_token

为什么 access_token 需要有过期时间，以及为什么比较短
为了安全

方法一 ： 
在请求发起前拦截每个请求，判断token的有效时间是否已经过期，若已过期，则将请求挂起，先刷新token后再继续请求

优点：在请求前拦截，能节省请求，省流量
缺点：需要后端额外提供一个token过期时间的字段，使用本地时间判断，若本地时间被篡改，特别是本地时间比服务器时间慢时，拦截会失败

方法二：
不在请求前拦截，而是拦截返回后的数据，先发起请求，接口返回过期后，先刷新token，再进行一次重试
优点：不需要额外的token过期字段，不需要判断时间
缺点：会消耗多一次请求，耗流量

推荐第二种


element-ui 弹出层问题 第一次弹出在created函数加载以后，再关闭，弹出层不会销毁，只是默认隐藏，不会再走created函数，解决办法：使用v-if

路由：把动态路由组件变成不依赖路由得组件
{
   path:'/role/:roleId/all-menu',
   props:true//把路由参数映射到组件中
}

父子组件 v-model用法 <course-image v-model="course.courseList">
v-model 本质还是父子组件通信，
 1.它会给子组件传递一个名字叫value得数据
 2.默认监听input 事件，修改绑定得数据

 上传图片过程中使用进度条element-ui
 怎么让环形进度条从1%-100%
 axios中有一个属性与method同级
 html5新增的上传响应事件：progress
 onUploadProgress(e){
   console.log(e.loaded) //已上传的数据大小
   console.log(e.total) //上传文件的总大小
   console.log(Math.floor(e.loaded /e.total * 100))上传进度百分比
 }

 富文本编辑器
 ckeditor (非常稳定)
 quill
 wangEditor


 