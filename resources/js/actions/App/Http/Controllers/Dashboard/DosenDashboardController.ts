import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
const DosenDashboardController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DosenDashboardController.url(options),
    method: 'get',
})

DosenDashboardController.definition = {
    methods: ["get","head"],
    url: '/dashboard/dosen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
DosenDashboardController.url = (options?: RouteQueryOptions) => {
    return DosenDashboardController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
DosenDashboardController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DosenDashboardController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
DosenDashboardController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: DosenDashboardController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
const DosenDashboardControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DosenDashboardController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
DosenDashboardControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DosenDashboardController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
DosenDashboardControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DosenDashboardController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

DosenDashboardController.form = DosenDashboardControllerForm

export default DosenDashboardController