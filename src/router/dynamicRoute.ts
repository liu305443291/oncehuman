// 动态路由
import { RouteConfig } from 'vue-router'
import Layout from '@/views/layout/index.vue'

const dynamicRoute: Array<RouteConfig> = [
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
    }
]

export default dynamicRoute