import { setItem, getItem } from '@/utils/localStorage'

// 根据页码筛选数据------------------------------
export function getDataByPage(data: any, query: any) {
    const page = query?.page
    const pageSize = query?.pageSize

    const list = data?.slice(((page - 1) * pageSize), (page * pageSize))

    const res = {
        list,
        page,
        pageSize,
        total: data?.length,
    }

    return res
}

// 若浏览器为空则初始化数据------------------------------
export function saveToBrowser(name: any, data: any) {
    if (!getItem(name)) setItem(name, data)
}

// 获取不重复ID------------------------------
export function setId(name: any) {
    let id = name + '_' + Date.now()

    // 去重
    const id_list = getItem(name)?.map((v: any) => v.id)
    while (id_list?.includes(id)) {
        id = name + '_' + Date.now()
    }

    return id
}

// 模糊搜索
export function fuzzySearch(target: any, pattern: any) {
    // 将搜索词转换为正则表达式，并添加模糊搜索的标志
    const regex = new RegExp(pattern.split('').join('.*'), 'i');
    // 使用正则表达式进行匹配
    return regex.test(target);
}