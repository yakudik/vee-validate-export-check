// composables
import { vFormDefOptions } from './common'

// utils
import { ref } from 'vue'
import { useForm as useFormPlugin } from 'vee-validate'
import { deepMerge } from '@/utils/helpers'

// types
import type { SubmissionContext } from 'vee-validate'
import type { ObjectUnknown } from '@/types/helpers'
import type { VFormOptions } from './common'


export function useForm<TValues extends ObjectUnknown = ObjectUnknown>(options?: VFormOptions<TValues>) {
    const opts = deepMerge<VFormOptions<TValues>>(vFormDefOptions, options)

    const formPlugin = useFormPlugin<TValues>(opts.plugin)

    const isSubmitting = ref(false)
    const isSubmitted = ref(false)

    // skiping requestHandler typing just to simplify the example
    function handleSubmit(requestHandler?: (payload: TValues, context: SubmissionContext<TValues>) => Promise<any>) {
        const onSubmit = formPlugin.handleSubmit(async (values, context) => {
            if (!opts.parallel && isSubmitting.value) {
                return
            }

            isSubmitting.value = true

            try {
                let res = await requestHandler?.(values, context)
                if (res?.status === 'error' && res.fields) {
                    formPlugin.setErrors(res.fields as any)
                }

                isSubmitting.value = (!opts.once || res?.status !== 'success')
                    ? false
                    : true
            } finally {
                isSubmitting.value = false
            }
        })

        return onSubmit
    }

    return {
        ...formPlugin,
        handleSubmit,
        isSubmitting,
        isSubmitted
    }
}
