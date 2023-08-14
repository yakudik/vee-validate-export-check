export type ObjectLike = Record<string, any>
export type ObjectUnknown = Record<string, unknown>

export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T