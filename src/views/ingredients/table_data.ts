import { getOption } from "@/utils"

const filterList: any = [
    {
        label: "名称",
        prop: "name",
        type: "input",
    },
    {
        label: "类型",
        prop: "type",
        type: "select",
        options: getOption('INGREDIENT_TYPE_ENUM'),
    },
    {
        label: "品质",
        prop: "quality",
        type: "select",
        options: getOption('QUALITY_ENUM'),
    },
]

export {
    filterList
} 