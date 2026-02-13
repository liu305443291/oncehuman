import { DATA_INGREDIENTS } from '@/data/index'
import { getDataByPage, fuzzySearch } from '@/utils/api'
import { getItem } from '@/utils/localStorage'

const name = "DATA_INGREDIENTS"

export function page(query: any) {
    return new Promise((resolve) => {

        // 获取全部数据
        let list: any = getItem('DATA_INGREDIENTS') || DATA_INGREDIENTS || []

        if (query?.name) list = list.filter((v: any) => {
            return fuzzySearch(v.name, query.name)
        })

        if (query?.grade) list = list.filter((v: any) => {
            return v.grade === query.grade
        })

        // 返回分页数据
        list = getDataByPage(list, query)

        resolve(list)
    })
}
