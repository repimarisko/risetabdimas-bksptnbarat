import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::index
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:22
* @route '/admin/pt-penelitian'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pt-penelitian',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::index
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:22
* @route '/admin/pt-penelitian'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::index
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:22
* @route '/admin/pt-penelitian'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::index
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:22
* @route '/admin/pt-penelitian'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::index
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:22
* @route '/admin/pt-penelitian'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::index
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:22
* @route '/admin/pt-penelitian'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::index
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:22
* @route '/admin/pt-penelitian'
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
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::deleted
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:48
* @route '/admin/pt-penelitian/deleted'
*/
export const deleted = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: deleted.url(options),
    method: 'get',
})

deleted.definition = {
    methods: ["get","head"],
    url: '/admin/pt-penelitian/deleted',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::deleted
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:48
* @route '/admin/pt-penelitian/deleted'
*/
deleted.url = (options?: RouteQueryOptions) => {
    return deleted.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::deleted
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:48
* @route '/admin/pt-penelitian/deleted'
*/
deleted.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: deleted.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::deleted
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:48
* @route '/admin/pt-penelitian/deleted'
*/
deleted.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: deleted.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::deleted
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:48
* @route '/admin/pt-penelitian/deleted'
*/
const deletedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: deleted.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::deleted
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:48
* @route '/admin/pt-penelitian/deleted'
*/
deletedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: deleted.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::deleted
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:48
* @route '/admin/pt-penelitian/deleted'
*/
deletedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: deleted.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

deleted.form = deletedForm

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::restore
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:73
* @route '/admin/pt-penelitian/{uuid}/restore'
*/
export const restore = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

restore.definition = {
    methods: ["post"],
    url: '/admin/pt-penelitian/{uuid}/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::restore
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:73
* @route '/admin/pt-penelitian/{uuid}/restore'
*/
restore.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
    }

    return restore.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::restore
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:73
* @route '/admin/pt-penelitian/{uuid}/restore'
*/
restore.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::restore
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:73
* @route '/admin/pt-penelitian/{uuid}/restore'
*/
const restoreForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::restore
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:73
* @route '/admin/pt-penelitian/{uuid}/restore'
*/
restoreForm.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, options),
    method: 'post',
})

restore.form = restoreForm

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reviewerAssignIndex
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:160
* @route '/admin/pt-penelitian/assign-reviewer'
*/
export const reviewerAssignIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewerAssignIndex.url(options),
    method: 'get',
})

reviewerAssignIndex.definition = {
    methods: ["get","head"],
    url: '/admin/pt-penelitian/assign-reviewer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reviewerAssignIndex
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:160
* @route '/admin/pt-penelitian/assign-reviewer'
*/
reviewerAssignIndex.url = (options?: RouteQueryOptions) => {
    return reviewerAssignIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reviewerAssignIndex
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:160
* @route '/admin/pt-penelitian/assign-reviewer'
*/
reviewerAssignIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewerAssignIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reviewerAssignIndex
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:160
* @route '/admin/pt-penelitian/assign-reviewer'
*/
reviewerAssignIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reviewerAssignIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reviewerAssignIndex
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:160
* @route '/admin/pt-penelitian/assign-reviewer'
*/
const reviewerAssignIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewerAssignIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reviewerAssignIndex
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:160
* @route '/admin/pt-penelitian/assign-reviewer'
*/
reviewerAssignIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewerAssignIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reviewerAssignIndex
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:160
* @route '/admin/pt-penelitian/assign-reviewer'
*/
reviewerAssignIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewerAssignIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

reviewerAssignIndex.form = reviewerAssignIndexForm

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::exportMethod
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:234
* @route '/admin/pt-penelitian/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/pt-penelitian/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::exportMethod
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:234
* @route '/admin/pt-penelitian/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::exportMethod
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:234
* @route '/admin/pt-penelitian/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::exportMethod
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:234
* @route '/admin/pt-penelitian/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::exportMethod
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:234
* @route '/admin/pt-penelitian/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::exportMethod
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:234
* @route '/admin/pt-penelitian/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::exportMethod
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:234
* @route '/admin/pt-penelitian/export'
*/
exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::approve
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:133
* @route '/admin/pt-penelitian/{ptPenelitian}/approve'
*/
export const approve = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

approve.definition = {
    methods: ["patch"],
    url: '/admin/pt-penelitian/{ptPenelitian}/approve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::approve
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:133
* @route '/admin/pt-penelitian/{ptPenelitian}/approve'
*/
approve.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return approve.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::approve
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:133
* @route '/admin/pt-penelitian/{ptPenelitian}/approve'
*/
approve.patch = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::approve
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:133
* @route '/admin/pt-penelitian/{ptPenelitian}/approve'
*/
const approveForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::approve
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:133
* @route '/admin/pt-penelitian/{ptPenelitian}/approve'
*/
approveForm.patch = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reject
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:147
* @route '/admin/pt-penelitian/{ptPenelitian}/reject'
*/
export const reject = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

reject.definition = {
    methods: ["patch"],
    url: '/admin/pt-penelitian/{ptPenelitian}/reject',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reject
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:147
* @route '/admin/pt-penelitian/{ptPenelitian}/reject'
*/
reject.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return reject.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reject
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:147
* @route '/admin/pt-penelitian/{ptPenelitian}/reject'
*/
reject.patch = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reject
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:147
* @route '/admin/pt-penelitian/{ptPenelitian}/reject'
*/
const rejectForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::reject
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:147
* @route '/admin/pt-penelitian/{ptPenelitian}/reject'
*/
rejectForm.patch = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

reject.form = rejectForm

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::assignReviewer
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:217
* @route '/admin/pt-penelitian/{ptPenelitian}/assign-reviewer'
*/
export const assignReviewer = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignReviewer.url(args, options),
    method: 'post',
})

assignReviewer.definition = {
    methods: ["post"],
    url: '/admin/pt-penelitian/{ptPenelitian}/assign-reviewer',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::assignReviewer
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:217
* @route '/admin/pt-penelitian/{ptPenelitian}/assign-reviewer'
*/
assignReviewer.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return assignReviewer.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::assignReviewer
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:217
* @route '/admin/pt-penelitian/{ptPenelitian}/assign-reviewer'
*/
assignReviewer.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignReviewer.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::assignReviewer
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:217
* @route '/admin/pt-penelitian/{ptPenelitian}/assign-reviewer'
*/
const assignReviewerForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignReviewer.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::assignReviewer
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:217
* @route '/admin/pt-penelitian/{ptPenelitian}/assign-reviewer'
*/
assignReviewerForm.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignReviewer.url(args, options),
    method: 'post',
})

assignReviewer.form = assignReviewerForm

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::show
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:85
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
export const show = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/pt-penelitian/{ptPenelitian}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::show
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:85
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
show.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::show
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:85
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
show.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::show
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:85
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
show.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::show
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:85
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
const showForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::show
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:85
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
showForm.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::show
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:85
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
showForm.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:118
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
export const destroy = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/pt-penelitian/{ptPenelitian}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:118
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
destroy.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:118
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
destroy.delete = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:118
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
const destroyForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\AdminPtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/AdminPtPenelitianController.php:118
* @route '/admin/pt-penelitian/{ptPenelitian}'
*/
destroyForm.delete = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const AdminPtPenelitianController = { index, deleted, restore, reviewerAssignIndex, exportMethod, approve, reject, assignReviewer, show, destroy, export: exportMethod }

export default AdminPtPenelitianController