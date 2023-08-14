// utils
import { isObject } from './is'

// types
import type { ObjectLike } from '@/types/helpers'

export function deepMerge<R = ObjectLike>(t1: ObjectLike = {}, t2: ObjectLike = {}): R {
    let target: ObjectLike = {}

    for (let key in t1) {
        target[key] = t1[key]
    }

    for (let key in t2) {
        let t1Prop = t1[key]
        let t2Prop = t2[key]

        if (isObject(t1Prop) && isObject(t2Prop)) {
            target[key] = deepMerge(t1Prop, t2Prop)
        } else {
            target[key] = t2Prop
        }
    }

    return target as R
}
