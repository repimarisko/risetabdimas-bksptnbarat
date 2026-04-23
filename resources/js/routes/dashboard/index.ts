import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
export const dosen = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dosen.url(options),
    method: 'get',
})

dosen.definition = {
    methods: ["get","head"],
    url: '/dashboard/dosen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
dosen.url = (options?: RouteQueryOptions) => {
    return dosen.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
dosen.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dosen.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
dosen.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dosen.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
const dosenForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dosen.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
dosenForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dosen.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\DosenDashboardController::__invoke
* @see app/Http/Controllers/Dashboard/DosenDashboardController.php:16
* @route '/dashboard/dosen'
*/
dosenForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dosen.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dosen.form = dosenForm

/**
* @see routes/web.php:51
* @route '/dashboard/admin-pt'
*/
export const adminPt = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminPt.url(options),
    method: 'get',
})

adminPt.definition = {
    methods: ["get","head"],
    url: '/dashboard/admin-pt',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:51
* @route '/dashboard/admin-pt'
*/
adminPt.url = (options?: RouteQueryOptions) => {
    return adminPt.definition.url + queryParams(options)
}

/**
* @see routes/web.php:51
* @route '/dashboard/admin-pt'
*/
adminPt.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminPt.url(options),
    method: 'get',
})

/**
* @see routes/web.php:51
* @route '/dashboard/admin-pt'
*/
adminPt.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminPt.url(options),
    method: 'head',
})

/**
* @see routes/web.php:51
* @route '/dashboard/admin-pt'
*/
const adminPtForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: adminPt.url(options),
    method: 'get',
})

/**
* @see routes/web.php:51
* @route '/dashboard/admin-pt'
*/
adminPtForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: adminPt.url(options),
    method: 'get',
})

/**
* @see routes/web.php:51
* @route '/dashboard/admin-pt'
*/
adminPtForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: adminPt.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

adminPt.form = adminPtForm

/**
* @see routes/web.php:60
* @route '/dashboard/ketua-lppm'
*/
export const ketuaLppm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ketuaLppm.url(options),
    method: 'get',
})

ketuaLppm.definition = {
    methods: ["get","head"],
    url: '/dashboard/ketua-lppm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:60
* @route '/dashboard/ketua-lppm'
*/
ketuaLppm.url = (options?: RouteQueryOptions) => {
    return ketuaLppm.definition.url + queryParams(options)
}

/**
* @see routes/web.php:60
* @route '/dashboard/ketua-lppm'
*/
ketuaLppm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ketuaLppm.url(options),
    method: 'get',
})

/**
* @see routes/web.php:60
* @route '/dashboard/ketua-lppm'
*/
ketuaLppm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ketuaLppm.url(options),
    method: 'head',
})

/**
* @see routes/web.php:60
* @route '/dashboard/ketua-lppm'
*/
const ketuaLppmForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ketuaLppm.url(options),
    method: 'get',
})

/**
* @see routes/web.php:60
* @route '/dashboard/ketua-lppm'
*/
ketuaLppmForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ketuaLppm.url(options),
    method: 'get',
})

/**
* @see routes/web.php:60
* @route '/dashboard/ketua-lppm'
*/
ketuaLppmForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ketuaLppm.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ketuaLppm.form = ketuaLppmForm

/**
* @see routes/web.php:65
* @route '/dashboard/reviewer'
*/
export const reviewer = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewer.url(options),
    method: 'get',
})

reviewer.definition = {
    methods: ["get","head"],
    url: '/dashboard/reviewer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:65
* @route '/dashboard/reviewer'
*/
reviewer.url = (options?: RouteQueryOptions) => {
    return reviewer.definition.url + queryParams(options)
}

/**
* @see routes/web.php:65
* @route '/dashboard/reviewer'
*/
reviewer.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewer.url(options),
    method: 'get',
})

/**
* @see routes/web.php:65
* @route '/dashboard/reviewer'
*/
reviewer.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reviewer.url(options),
    method: 'head',
})

/**
* @see routes/web.php:65
* @route '/dashboard/reviewer'
*/
const reviewerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewer.url(options),
    method: 'get',
})

/**
* @see routes/web.php:65
* @route '/dashboard/reviewer'
*/
reviewerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewer.url(options),
    method: 'get',
})

/**
* @see routes/web.php:65
* @route '/dashboard/reviewer'
*/
reviewerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewer.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

reviewer.form = reviewerForm

/**
* @see routes/web.php:70
* @route '/dashboard/super-admin'
*/
export const superAdmin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: superAdmin.url(options),
    method: 'get',
})

superAdmin.definition = {
    methods: ["get","head"],
    url: '/dashboard/super-admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:70
* @route '/dashboard/super-admin'
*/
superAdmin.url = (options?: RouteQueryOptions) => {
    return superAdmin.definition.url + queryParams(options)
}

/**
* @see routes/web.php:70
* @route '/dashboard/super-admin'
*/
superAdmin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: superAdmin.url(options),
    method: 'get',
})

/**
* @see routes/web.php:70
* @route '/dashboard/super-admin'
*/
superAdmin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: superAdmin.url(options),
    method: 'head',
})

/**
* @see routes/web.php:70
* @route '/dashboard/super-admin'
*/
const superAdminForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: superAdmin.url(options),
    method: 'get',
})

/**
* @see routes/web.php:70
* @route '/dashboard/super-admin'
*/
superAdminForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: superAdmin.url(options),
    method: 'get',
})

/**
* @see routes/web.php:70
* @route '/dashboard/super-admin'
*/
superAdminForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: superAdmin.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

superAdmin.form = superAdminForm

const dashboard = {
    dosen: Object.assign(dosen, dosen),
    adminPt: Object.assign(adminPt, adminPt),
    ketuaLppm: Object.assign(ketuaLppm, ketuaLppm),
    reviewer: Object.assign(reviewer, reviewer),
    superAdmin: Object.assign(superAdmin, superAdmin),
}

export default dashboard