import { DATA_MENU } from '@/data/index'

export function getData() {
    return new Promise((resolve) => {
        const list = DATA_MENU || []

        sort(list)

        // setItem(name, list)

        resolve(list)
    })
}

// 排序
function sort(arr: any) {
    arr.sort((a: any, b: any) => a.index - b.index)?.forEach((v: any) => {
        if (v.child?.length) sort(v.child)
    })
}