import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::index
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/users/approvals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::index
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::index
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::index
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::index
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::index
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::index
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
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
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approve
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:57
* @route '/users/approvals/{dosen}/approve'
*/
export const approve = (args: { dosen: string | number | { uuid: string | number } } | [dosen: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

approve.definition = {
    methods: ["patch"],
    url: '/users/approvals/{dosen}/approve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approve
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:57
* @route '/users/approvals/{dosen}/approve'
*/
approve.url = (args: { dosen: string | number | { uuid: string | number } } | [dosen: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dosen: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'uuid' in args) {
        args = { dosen: args.uuid }
    }

    if (Array.isArray(args)) {
        args = {
            dosen: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        dosen: typeof args.dosen === 'object'
        ? args.dosen.uuid
        : args.dosen,
    }

    return approve.definition.url
            .replace('{dosen}', parsedArgs.dosen.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approve
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:57
* @route '/users/approvals/{dosen}/approve'
*/
approve.patch = (args: { dosen: string | number | { uuid: string | number } } | [dosen: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approve
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:57
* @route '/users/approvals/{dosen}/approve'
*/
const approveForm = (args: { dosen: string | number | { uuid: string | number } } | [dosen: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approve
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:57
* @route '/users/approvals/{dosen}/approve'
*/
approveForm.patch = (args: { dosen: string | number | { uuid: string | number } } | [dosen: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

approve.form = approveForm

const AdminPtUserApprovalController = { index, approve }

export default AdminPtUserApprovalController