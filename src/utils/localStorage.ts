// 写入 【localStorage】
export function setItem(name: string, data: any) {
    if (!data) throw new TypeError('data不能为空')
    localStorage.setItem(name, JSON.stringify(data))
}

// 查询 【localStorage】
export function getItem(name: string) {
    let res = null
    const data = localStorage.getItem(name)
    if (data) res = JSON.parse(data)
    return res
}