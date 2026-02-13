import * as ENUM from '@/enum/index'

type EnumKey = keyof typeof ENUM;
type OptionItem = {
    label: string;
    value: string;
};

/**
 * 根据枚举名称获取 label-value 格式的选项数组
 * @param name 枚举名称（必须是 ENUM 的 key，如 'VISION_ACTIVI_ENUM'/'FOOD_TYPE_ENUM'）
 * @returns label-value 数组，异常时返回空数组
 */
const getOption = (name: EnumKey): OptionItem[] => {
    // 校验入参对应的枚举是否存在
    const enumObj = ENUM[name];
    if (!enumObj || typeof enumObj !== 'object' || Array.isArray(enumObj)) {
        console.warn(`枚举 ${name} 不存在或格式错误`);
        return [];
    }

    // 转换为 label-value 数组（确保 value/label 都是字符串）
    return Object.entries(enumObj).map(([value, label]) => ({
        // 兜底转字符串，避免非字符串值
        label: String(label),
        value: String(value)
    }));
};

export {
    getOption
}