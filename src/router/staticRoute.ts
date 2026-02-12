// 静态路由
import { RouteConfig } from 'vue-router'

const staticRoute: Array<RouteConfig> = [
    // 404页面
    {
        path: '/404',
        component: () => import('@/views/404/index.vue')
    },

    // 主页
    {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout/index.vue'),
    },

    // 匹配不到路径展示上面404页面 404页面必须放置在最后
    { path: '*', redirect: '/404' }
]

export default staticRoute