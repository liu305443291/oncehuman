// 动态路由
import { RouteConfig } from 'vue-router'
import Layout from '@/views/layout/index.vue'

const dynamicRoute: Array<RouteConfig> = [
    // 首页
    {
        path: '/homePage',
        component: Layout,
        children: [
            {
                path: '',
                name: 'homePage',
                component: () => import('@/views/homePage/index.vue'),
            }
        ]
    },
    // 食物
    {
        path: '/food',
        component: Layout,
        children: [
            {
                path: '',
                name: 'food',
                component: () => import('@/views/food/index.vue'),
            }
        ]
    },
    // 食材
    {
        path: '/ingredients',
        component: Layout,
        children: [
            {
                path: '',
                name: 'ingredients',
                component: () => import('@/views/ingredients/index.vue'),
            }
        ]
    }
]

export default dynamicRoute