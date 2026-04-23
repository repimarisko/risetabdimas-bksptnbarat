import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::index
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:17
* @route '/admin/pt-skema'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pt-skema',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::index
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:17
* @route '/admin/pt-skema'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::index
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:17
* @route '/admin/pt-skema'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::index
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:17
* @route '/admin/pt-skema'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::index
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:17
* @route '/admin/pt-skema'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::index
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:17
* @route '/admin/pt-skema'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::index
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:17
* @route '/admin/pt-skema'
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
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::create
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:72
* @route '/admin/pt-skema/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/pt-skema/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::create
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:72
* @route '/admin/pt-skema/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::create
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:72
* @route '/admin/pt-skema/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::create
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:72
* @route '/admin/pt-skema/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::create
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:72
* @route '/admin/pt-skema/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::create
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:72
* @route '/admin/pt-skema/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::create
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:72
* @route '/admin/pt-skema/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::store
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:92
* @route '/admin/pt-skema'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/pt-skema',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::store
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:92
* @route '/admin/pt-skema'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::store
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:92
* @route '/admin/pt-skema'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::store
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:92
* @route '/admin/pt-skema'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtSkemaController::store
* @see app/Http/Controllers/Penelitian/AdminPtSkemaController.php:92
* @route '/admin/pt-skema'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const AdminPtSkemaController = { index, create, store }

export default AdminPtSkemaController