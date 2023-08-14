export function isObject(value: unknown): value is object {
    return String.call(value) === '[object Object]'
}
