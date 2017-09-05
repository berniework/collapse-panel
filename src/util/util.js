/**
 * 自动生成一个随机id
 */
export function generateUUID() {
    return Math.random().toString(36).substring(2);
};