import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import review31e8d2 from './review'
/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/reviewer/pt-penelitian',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::review
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
export const review = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: review.url(args, options),
    method: 'get',
})

review.definition = {
    methods: ["get","head"],
    url: '/reviewer/pt-penelitian/{ptPenelitian}/review',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::review
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
review.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return review.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::review
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
review.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: review.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::review
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
review.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: review.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::review
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
const reviewForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: review.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::review
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewForm.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: review.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::review
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewForm.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: review.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

review.form = reviewForm

const ptPenelitian = {
    index: Object.assign(index, index),
    review: Object.assign(review, review31e8d2),
}

export default ptPenelitian