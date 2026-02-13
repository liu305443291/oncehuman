import { setItem, getItem } from '@/utils/localStorage'

interface PaginationQuery {
    page?: number;
    pageSize?: number;
}

/**
 * 对数组数据进行分页处理
 * @param data 原始数据数组
 * @param query 分页查询参数（page: 页码, pageSize: 每页条数）
 * @returns 包含分页信息的结果对象
 */
export function getDataByPage<T = any>(data: T[] | null | undefined, query: PaginationQuery) {
    // 处理data为null/undefined的情况，默认空数组
    const rawData = data || [];

    // 处理页码：默认第1页，小于1则强制为1
    const page = Math.max(Number(query?.page) || 1, 1);

    // 处理每页条数：默认10条，小于1则强制为10
    const pageSize = Math.max(Number(query?.pageSize) || 10, 10);

    // 计算分页起始/结束索引，确保不超出数组范围
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(page * pageSize, rawData.length);

    // 截取当前页数据
    const list = rawData.slice(startIndex, endIndex);

    const res = {
        list,
        page,
        pageSize,
        total: rawData.length, // 总条数
        totalPages: Math.ceil(rawData.length / pageSize), // 总页数
    };

    return res;
}

// 若浏览器为空则初始化数据------------------------------
export function saveToBrowser(name: any, data: any) {
    if (!getItem(name)) setItem(name, data)
}

/**
 * 生成基于名称和时间戳的不重复唯一ID
 * @param name 前缀名称（非空字符串）
 * @returns 格式为 "name_时间戳_随机数" 的唯一ID
 */
export function setId(name: string): string {
    // 1. 入参校验：确保name是有效非空字符串，避免生成无效ID
    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('ID前缀名称必须是非空字符串');
    }
    const validName = name.trim();

    // 2. 获取已存在的ID列表，做空值处理，避免后续includes报错
    const storedList = getItem(validName) || [];
    const idList = Array.isArray(storedList)
        ? storedList.map((v: { id?: string }) => v.id ?? '').filter(Boolean) // 过滤空ID
        : [];

    // 3. 生成ID：时间戳 + 随机数，降低高并发下重复概率
    let id: string;
    do {
        // 追加随机数（0-9999），解决同一毫秒多次调用导致的重复问题
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        id = `${validName}_${timestamp}_${random}`;
    } while (idList.includes(id)); // 循环直到生成未存在的ID

    return id;
}

/**
 * 模糊搜索函数：匹配目标字符串是否按顺序包含搜索模式的所有字符
 * @param target 待搜索的目标字符串（支持 null/undefined，自动转为空串）
 * @param pattern 搜索模式字符串（支持 null/undefined，自动转为空串）
 * @param options 可选配置项
 * @param options.caseSensitive 是否区分大小写，默认 false（不区分）
 * @param options.allowEmptyPattern 空搜索模式是否返回 true，默认 true（符合通用搜索逻辑）
 * @returns 匹配结果：布尔值
 */
export function fuzzySearch(
    target: string | null | undefined,
    pattern: string | null | undefined,
    options: {
        caseSensitive?: boolean;
        allowEmptyPattern?: boolean;
    } = {}
): boolean {
    // 1. 解构配置项，设置默认值
    const { caseSensitive = false, allowEmptyPattern = true } = options;

    // 2. 归一化处理：非字符串转为空串，去除首尾空格
    const normalizedTarget = typeof target === 'string' ? target.trim() : '';
    const normalizedPattern = typeof pattern === 'string' ? pattern.trim() : '';

    // 3. 空模式处理：直接返回配置的默认结果
    if (normalizedPattern === '') {
        return allowEmptyPattern;
    }

    try {
        // 4. 转义正则特殊字符（如 . * + ? $ ^ 等），避免破坏正则结构
        const escapeRegExpChar = (char: string) =>
            char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // 5. 构建模糊匹配正则：字符之间允许任意字符（.*）
        const escapedPattern = normalizedPattern
            .split('')
            .map(escapeRegExpChar)
            .join('.*');

        // 6. 设置正则标志（i = 不区分大小写）
        const regexFlags = caseSensitive ? '' : 'i';
        const regex = new RegExp(escapedPattern, regexFlags);

        // 7. 执行匹配
        return regex.test(normalizedTarget);
    } catch (error) {
        // 兜底：正则构建失败时返回 false，避免程序崩溃
        console.warn('模糊搜索正则构建失败：', error);
        return false;
    }
}