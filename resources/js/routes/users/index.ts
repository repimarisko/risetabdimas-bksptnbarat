import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import approvalsF41aa7 from './approvals'
/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approvals
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
export const approvals = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: approvals.url(options),
    method: 'get',
})

approvals.definition = {
    methods: ["get","head"],
    url: '/users/approvals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approvals
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
approvals.url = (options?: RouteQueryOptions) => {
    return approvals.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approvals
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
approvals.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: approvals.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approvals
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
approvals.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: approvals.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approvals
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
const approvalsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: approvals.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approvals
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
approvalsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: approvals.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\AdminPtUserApprovalController::approvals
* @see app/Http/Controllers/Users/AdminPtUserApprovalController.php:16
* @route '/users/approvals'
*/
approvalsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: approvals.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

approvals.form = approvalsForm

const users = {
    approvals: Object.assign(approvals, approvalsF41aa7),
}

export default users