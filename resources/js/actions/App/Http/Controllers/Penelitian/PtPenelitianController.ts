import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:40
* @route '/pt-penelitian'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pt-penelitian',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:40
* @route '/pt-penelitian'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:40
* @route '/pt-penelitian'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:40
* @route '/pt-penelitian'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:40
* @route '/pt-penelitian'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:40
* @route '/pt-penelitian'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::index
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:40
* @route '/pt-penelitian'
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
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::perbaikan
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:247
* @route '/pt-penelitian/perbaikan'
*/
export const perbaikan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: perbaikan.url(options),
    method: 'get',
})

perbaikan.definition = {
    methods: ["get","head"],
    url: '/pt-penelitian/perbaikan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::perbaikan
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:247
* @route '/pt-penelitian/perbaikan'
*/
perbaikan.url = (options?: RouteQueryOptions) => {
    return perbaikan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::perbaikan
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:247
* @route '/pt-penelitian/perbaikan'
*/
perbaikan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: perbaikan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::perbaikan
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:247
* @route '/pt-penelitian/perbaikan'
*/
perbaikan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: perbaikan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::perbaikan
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:247
* @route '/pt-penelitian/perbaikan'
*/
const perbaikanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: perbaikan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::perbaikan
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:247
* @route '/pt-penelitian/perbaikan'
*/
perbaikanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: perbaikan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::perbaikan
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:247
* @route '/pt-penelitian/perbaikan'
*/
perbaikanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: perbaikan.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

perbaikan.form = perbaikanForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::create
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:131
* @route '/pt-penelitian/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/pt-penelitian/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::create
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:131
* @route '/pt-penelitian/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::create
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:131
* @route '/pt-penelitian/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::create
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:131
* @route '/pt-penelitian/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::create
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:131
* @route '/pt-penelitian/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::create
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:131
* @route '/pt-penelitian/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::create
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:131
* @route '/pt-penelitian/create'
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
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::store
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:417
* @route '/pt-penelitian'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pt-penelitian',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::store
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:417
* @route '/pt-penelitian'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::store
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:417
* @route '/pt-penelitian'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::store
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:417
* @route '/pt-penelitian'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::store
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:417
* @route '/pt-penelitian'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::approveAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1276
* @route '/pt-penelitian/{ptPenelitian}/anggota-approve'
*/
export const approveAnggota = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveAnggota.url(args, options),
    method: 'post',
})

approveAnggota.definition = {
    methods: ["post"],
    url: '/pt-penelitian/{ptPenelitian}/anggota-approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::approveAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1276
* @route '/pt-penelitian/{ptPenelitian}/anggota-approve'
*/
approveAnggota.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return approveAnggota.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::approveAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1276
* @route '/pt-penelitian/{ptPenelitian}/anggota-approve'
*/
approveAnggota.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveAnggota.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::approveAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1276
* @route '/pt-penelitian/{ptPenelitian}/anggota-approve'
*/
const approveAnggotaForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveAnggota.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::approveAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1276
* @route '/pt-penelitian/{ptPenelitian}/anggota-approve'
*/
approveAnggotaForm.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveAnggota.url(args, options),
    method: 'post',
})

approveAnggota.form = approveAnggotaForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::rejectAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1322
* @route '/pt-penelitian/{ptPenelitian}/anggota-reject'
*/
export const rejectAnggota = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectAnggota.url(args, options),
    method: 'post',
})

rejectAnggota.definition = {
    methods: ["post"],
    url: '/pt-penelitian/{ptPenelitian}/anggota-reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::rejectAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1322
* @route '/pt-penelitian/{ptPenelitian}/anggota-reject'
*/
rejectAnggota.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return rejectAnggota.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::rejectAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1322
* @route '/pt-penelitian/{ptPenelitian}/anggota-reject'
*/
rejectAnggota.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectAnggota.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::rejectAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1322
* @route '/pt-penelitian/{ptPenelitian}/anggota-reject'
*/
const rejectAnggotaForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: rejectAnggota.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::rejectAnggota
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1322
* @route '/pt-penelitian/{ptPenelitian}/anggota-reject'
*/
rejectAnggotaForm.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: rejectAnggota.url(args, options),
    method: 'post',
})

rejectAnggota.form = rejectAnggotaForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::submit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:777
* @route '/pt-penelitian/{ptPenelitian}/submit'
*/
export const submit = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: submit.url(args, options),
    method: 'patch',
})

submit.definition = {
    methods: ["patch"],
    url: '/pt-penelitian/{ptPenelitian}/submit',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::submit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:777
* @route '/pt-penelitian/{ptPenelitian}/submit'
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
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:777
* @route '/pt-penelitian/{ptPenelitian}/submit'
*/
submit.patch = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: submit.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::submit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:777
* @route '/pt-penelitian/{ptPenelitian}/submit'
*/
const submitForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::submit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:777
* @route '/pt-penelitian/{ptPenelitian}/submit'
*/
submitForm.patch = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

submit.form = submitForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::download
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1087
* @route '/pt-penelitian/{ptPenelitian}/download/{type}'
*/
export const download = (args: { ptPenelitian: string | number | { uuid: string | number }, type: string | number } | [ptPenelitian: string | number | { uuid: string | number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/pt-penelitian/{ptPenelitian}/download/{type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::download
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1087
* @route '/pt-penelitian/{ptPenelitian}/download/{type}'
*/
download.url = (args: { ptPenelitian: string | number | { uuid: string | number }, type: string | number } | [ptPenelitian: string | number | { uuid: string | number }, type: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            ptPenelitian: args[0],
            type: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ptPenelitian: typeof args.ptPenelitian === 'object'
        ? args.ptPenelitian.uuid
        : args.ptPenelitian,
        type: args.type,
    }

    return download.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::download
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1087
* @route '/pt-penelitian/{ptPenelitian}/download/{type}'
*/
download.get = (args: { ptPenelitian: string | number | { uuid: string | number }, type: string | number } | [ptPenelitian: string | number | { uuid: string | number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::download
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1087
* @route '/pt-penelitian/{ptPenelitian}/download/{type}'
*/
download.head = (args: { ptPenelitian: string | number | { uuid: string | number }, type: string | number } | [ptPenelitian: string | number | { uuid: string | number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::download
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1087
* @route '/pt-penelitian/{ptPenelitian}/download/{type}'
*/
const downloadForm = (args: { ptPenelitian: string | number | { uuid: string | number }, type: string | number } | [ptPenelitian: string | number | { uuid: string | number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::download
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1087
* @route '/pt-penelitian/{ptPenelitian}/download/{type}'
*/
downloadForm.get = (args: { ptPenelitian: string | number | { uuid: string | number }, type: string | number } | [ptPenelitian: string | number | { uuid: string | number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::download
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1087
* @route '/pt-penelitian/{ptPenelitian}/download/{type}'
*/
downloadForm.head = (args: { ptPenelitian: string | number | { uuid: string | number }, type: string | number } | [ptPenelitian: string | number | { uuid: string | number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

download.form = downloadForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::edit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:509
* @route '/pt-penelitian/{ptPenelitian}/edit'
*/
export const edit = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/pt-penelitian/{ptPenelitian}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::edit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:509
* @route '/pt-penelitian/{ptPenelitian}/edit'
*/
edit.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::edit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:509
* @route '/pt-penelitian/{ptPenelitian}/edit'
*/
edit.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::edit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:509
* @route '/pt-penelitian/{ptPenelitian}/edit'
*/
edit.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::edit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:509
* @route '/pt-penelitian/{ptPenelitian}/edit'
*/
const editForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::edit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:509
* @route '/pt-penelitian/{ptPenelitian}/edit'
*/
editForm.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::edit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:509
* @route '/pt-penelitian/{ptPenelitian}/edit'
*/
editForm.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::update
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:700
* @route '/pt-penelitian/{ptPenelitian}'
*/
export const update = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/pt-penelitian/{ptPenelitian}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::update
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:700
* @route '/pt-penelitian/{ptPenelitian}'
*/
update.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::update
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:700
* @route '/pt-penelitian/{ptPenelitian}'
*/
update.put = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::update
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:700
* @route '/pt-penelitian/{ptPenelitian}'
*/
const updateForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::update
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:700
* @route '/pt-penelitian/{ptPenelitian}'
*/
updateForm.put = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:762
* @route '/pt-penelitian/{ptPenelitian}'
*/
export const destroy = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/pt-penelitian/{ptPenelitian}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:762
* @route '/pt-penelitian/{ptPenelitian}'
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
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:762
* @route '/pt-penelitian/{ptPenelitian}'
*/
destroy.delete = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:762
* @route '/pt-penelitian/{ptPenelitian}'
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
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::destroy
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:762
* @route '/pt-penelitian/{ptPenelitian}'
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

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewerIndex
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
export const reviewerIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewerIndex.url(options),
    method: 'get',
})

reviewerIndex.definition = {
    methods: ["get","head"],
    url: '/reviewer/pt-penelitian',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewerIndex
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
reviewerIndex.url = (options?: RouteQueryOptions) => {
    return reviewerIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewerIndex
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
reviewerIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewerIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewerIndex
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
reviewerIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reviewerIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewerIndex
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
const reviewerIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewerIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewerIndex
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
reviewerIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewerIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewerIndex
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:307
* @route '/reviewer/pt-penelitian'
*/
reviewerIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewerIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

reviewerIndex.form = reviewerIndexForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewForm
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
export const reviewForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewForm.url(args, options),
    method: 'get',
})

reviewForm.definition = {
    methods: ["get","head"],
    url: '/reviewer/pt-penelitian/{ptPenelitian}/review',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewForm
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewForm.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return reviewForm.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewForm
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewForm.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviewForm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewForm
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewForm.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reviewForm.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewForm
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
const reviewFormForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewForm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewForm
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewFormForm.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewForm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewForm
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:367
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewFormForm.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reviewForm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

reviewForm.form = reviewFormForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewSubmit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
export const reviewSubmit = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reviewSubmit.url(args, options),
    method: 'post',
})

reviewSubmit.definition = {
    methods: ["post"],
    url: '/reviewer/pt-penelitian/{ptPenelitian}/review',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewSubmit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewSubmit.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return reviewSubmit.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewSubmit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewSubmit.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reviewSubmit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewSubmit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
const reviewSubmitForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reviewSubmit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::reviewSubmit
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:390
* @route '/reviewer/pt-penelitian/{ptPenelitian}/review'
*/
reviewSubmitForm.post = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reviewSubmit.url(args, options),
    method: 'post',
})

reviewSubmit.form = reviewSubmitForm

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::preview
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1007
* @route '/pt-penelitian/{ptPenelitian}/preview'
*/
export const preview = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/pt-penelitian/{ptPenelitian}/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::preview
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1007
* @route '/pt-penelitian/{ptPenelitian}/preview'
*/
preview.url = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
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

    return preview.definition.url
            .replace('{ptPenelitian}', parsedArgs.ptPenelitian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::preview
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1007
* @route '/pt-penelitian/{ptPenelitian}/preview'
*/
preview.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::preview
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1007
* @route '/pt-penelitian/{ptPenelitian}/preview'
*/
preview.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::preview
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1007
* @route '/pt-penelitian/{ptPenelitian}/preview'
*/
const previewForm = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::preview
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1007
* @route '/pt-penelitian/{ptPenelitian}/preview'
*/
previewForm.get = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Penelitian\PtPenelitianController::preview
* @see app/Http/Controllers/Penelitian/PtPenelitianController.php:1007
* @route '/pt-penelitian/{ptPenelitian}/preview'
*/
previewForm.head = (args: { ptPenelitian: string | number | { uuid: string | number } } | [ptPenelitian: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: preview.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

preview.form = previewForm

const PtPenelitianController = { index, perbaikan, create, store, approveAnggota, rejectAnggota, submit, download, edit, update, destroy, reviewerIndex, reviewForm, reviewSubmit, preview }

export default PtPenelitianController