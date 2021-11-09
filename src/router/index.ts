import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',//默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue'),
        meta: {
          requiresAuth: true//自定义数据
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index.vue'),
        meta: {
          requiresAuth: true//自定义数据
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue'),
        meta: {
          requiresAuth: true//自定义数据
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue'),
        meta: {
          requiresAuth: true//自定义数据
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue'),
        meta: {
          requiresAuth: true//自定义数据
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue'),
        meta: {
          requiresAuth: true//自定义数据
        }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue'),
        meta: {
          requiresAuth: true//自定义数据
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */'@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */'@/views/menu/edit.vue')
      },
      {
        path: '/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */'@/views/course/create.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */'@/views/error-page/index.vue')
  },
]

const router = new VueRouter({
  routes
})

//全局前端守卫：任何页面的访问都要经过这里
//to 去哪里
//from 从哪里来
//next  通行得标志
router.beforeEach((to, from, next) => {
  //to.match是一个数组（匹配到的路由记录）
  if (to.matched.some(record => record.meta.requiresAuth)){
    if(!store.state.user){
      //跳转到登录页
      next({
        name:'login',
        query: {
          redirect: to.fullPath //把登录成功需要返回的页面告诉登录页面
        }
      })
    }else{
      next()
    }

  }else{
    next()
  }

})

export default router
