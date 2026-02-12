interface Menu {
    name: string,
    sort: number,
    id: string
}

const menu: Array<Menu> = [
    {
        name: '食物',
        sort: 1,
        id: 'food'
    },
    {
        name: '配装',
        sort: 2,
        id: 'assemble'
    }
]

export default menu