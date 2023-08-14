import type { FormOptions } from 'vee-validate'
import type { DeepPartial, ObjectUnknown } from '@/types/helpers'

export interface VFormOptions<TValues extends ObjectUnknown = ObjectUnknown> {
    once?: boolean
    parallel?: boolean
    plugin?: FormOptions<TValues>
}


export const vFormDefOptions: DeepPartial<VFormOptions> = {
    once: false,
    parallel: false
}
