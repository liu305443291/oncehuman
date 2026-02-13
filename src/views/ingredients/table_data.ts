const filterList: any = [
    {
        label: "名称",
        prop: "name",
        type: "input",
    },
    {
        label: "品质",
        prop: "quality",
        type: "select",
        options: [
            {
                label: "是",
                value: 1,
            },
            {
                label: "否",
                value: 2,
            },
        ],
    },
    {
        label: "等级",
        prop: "grade",
        type: "select",
        options: [
            {
                label: "是",
                value: 1,
            },
            {
                label: "否",
                value: 2,
            },
        ],
    },
    {
        label: "获取方式",
        prop: "classify",
        type: "select",
        options: [
            {
                label: "大世界获取",
                value: 1,
            },
            {
                label: "模因解锁",
                value: 2,
            },
            {
                label: "主厨产物",
                value: 3,
            },
            {
                label: "活动解锁",
                value: 4,
            },
        ],
    },
]

export {
    filterList
} 