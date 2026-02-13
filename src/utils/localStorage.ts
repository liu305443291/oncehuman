/**
 * 检查 localStorage 是否可用（处理隐私模式/禁用场景）
 * @returns 是否可用
 */
function isLocalStorageAvailable(): boolean {
    try {
        const testKey = '__local_storage_test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        console.warn('localStorage 不可用：', error);
        return false;
    }
}

/**
 * 写入 localStorage（支持泛型，类型安全）
 * @param name 存储键名（非空字符串）
 * @param data 要存储的数据（支持任意可序列化类型）
 * @throws 键名非法/数据不可序列化/存储不可用时抛出友好错误
 */
export function setItem<T = unknown>(name: string, data: T): void {
    // 1. 校验键名合法性
    if (typeof name !== 'string' || name.trim() === '') {
        throw new TypeError('存储键名必须是非空字符串');
    }
    const validName = name.trim();

    // 2. 校验 localStorage 可用性
    if (!isLocalStorageAvailable()) {
        throw new Error('localStorage 不可用，无法写入数据');
    }

    // 3. 校验数据非空（保持原逻辑，可根据需求调整）
    if (data === undefined || data === null) {
        throw new TypeError('data 不能为空（null/undefined）');
    }

    try {
        // 4. 处理特殊类型（如 BigInt），避免 JSON.stringify 报错
        const serializedData = JSON.stringify(data, (_, value) => {
            if (typeof value === 'bigint') {
                return value.toString(); // BigInt 转为字符串存储
            }
            return value;
        });
        localStorage.setItem(validName, serializedData);
    } catch (error) {
        throw new Error(`数据序列化失败：${(error as Error).message}`);
    }
}

/**
 * 读取 localStorage（支持泛型，类型安全）
 * @param name 存储键名（非空字符串）
 * @param defaultValue 读取失败/无数据时的默认值（默认 null）
 * @returns 解析后的数据（泛型类型）或默认值
 */
export function getItem<T = unknown>(name: string, defaultValue: T | null = null): T | null {
    // 1. 校验键名合法性
    if (typeof name !== 'string' || name.trim() === '') {
        console.warn('存储键名必须是非空字符串，返回默认值');
        return defaultValue;
    }
    const validName = name.trim();

    // 2. 校验 localStorage 可用性
    if (!isLocalStorageAvailable()) {
        console.warn('localStorage 不可用，返回默认值');
        return defaultValue;
    }

    try {
        const rawData = localStorage.getItem(validName);
        // 3. 无数据时返回默认值
        if (rawData === null) {
            return defaultValue;
        }
        // 4. 解析数据（处理 BigInt 转回数字，可选）
        const parsedData = JSON.parse(rawData, (_, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, -1)); // 还原 BigInt 类型
            }
            return value;
        });
        return parsedData as T;
    } catch (error) {
        // 5. 解析失败时返回默认值，避免程序崩溃
        console.warn(`数据解析失败（键名：${validName}）：`, (error as Error).message);
        return defaultValue;
    }
}