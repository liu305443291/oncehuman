import { getItem, setItem } from '@/utils/localStorage'
import { setId } from '@/utils/api'

const name = "DATA_DIET"

export function add(query: any) {
    return new Promise((resolve) => {

        // 获取全部数据
        const list: any = getItem('DATA_DIET') || []

        const obj = {
            id: ''
        }

        list.push(obj)



        resolve(list)
    })
}