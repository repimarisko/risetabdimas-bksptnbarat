import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::submit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
export const submit = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/reviewer/pt-penelitian/{ptPenelitian}/review',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::submit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
submit.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ptPenelitian: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'uuid' in args) {
        args = { ptPenelitian: args.uuid }
    }

    if (Array.isArray(args)) {
        args = {
            ptPenelitian: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ptPenelitian: typeof args.ptPenelitian === 'object'
        ? args.ptPenelitian.uuid
        : args.ptPenelitian,
    }

    return submit.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::submit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
submit.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::submit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
const submitForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::submit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
submitForm.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(args, options),
    method: 'post',
})

submit.form = submitForm

const review = {
    submit: Object.assign(submit, submit),
}

export default review