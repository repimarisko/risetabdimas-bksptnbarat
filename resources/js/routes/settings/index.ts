import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import roleAssignmentFd8af0 from './role-assignment'
import roleMenus from './role-menus'
/**
* @see \App\Http\Controllers\Settings\RoleAssignmentController::roleAssignment
* @see app/Http/Controllers/Settings/RoleAssignmentController.php:18
* @route '/settings/role-assignment'
*/
export const roleAssignment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roleAssignment.url(options),
    method: 'get',
})

roleAssignment.definition = {
    methods: ["get","head"],
    url: '/settings/role-assignment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\RoleAssignmentController::roleAssignment
* @see app/Http/Controllers/Settings/RoleAssignmentController.php:18
* @route '/settings/role-assignment'
*/
roleAssignment.url = (options?: RouteQueryOptions) => {
    return roleAssignment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\RoleAssignmentController::roleAssignment
* @see app/Http/Controllers/Settings/RoleAssignmentController.php:18
* @route '/settings/role-assignment'
*/
roleAssignment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roleAssignment.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\RoleAssignmentController::roleAssignment
* @see app/Http/Controllers/Settings/RoleAssignmentController.php:18
* @route '/settings/role-assignment'
*/
roleAssignment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: roleAssignment.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\RoleAssignmentController::roleAssignment
* @see app/Http/Controllers/Settings/RoleAssignmentController.php:18
* @route '/settings/role-assignment'
*/
const roleAssignmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: roleAssignment.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\RoleAssignmentController::roleAssignment
* @see app/Http/Controllers/Settings/RoleAssignmentController.php:18
* @route '/settings/role-assignment'
*/
roleAssignmentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: roleAssignment.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\RoleAssignmentController::roleAssignment
* @see app/Http/Controllers/Settings/RoleAssignmentController.php:18
* @route '/settings/role-assignment'
*/
roleAssignmentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: roleAssignment.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

roleAssignment.form = roleAssignmentForm

/**
* @see routes/web.php:83
* @route '/settings/active-role'
*/
export const activeRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activeRole.url(options),
    method: 'post',
})

activeRole.definition = {
    methods: ["post"],
    url: '/settings/active-role',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/web.php:83
* @route '/settings/active-role'
*/
activeRole.url = (options?: RouteQueryOptions) => {
    return activeRole.definition.url + queryParams(options)
}

/**
* @see routes/web.php:83
* @route '/settings/active-role'
*/
activeRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activeRole.url(options),
    method: 'post',
})

/**
* @see routes/web.php:83
* @route '/settings/active-role'
*/
const activeRoleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: activeRole.url(options),
    method: 'post',
})

/**
* @see routes/web.php:83
* @route '/settings/active-role'
*/
activeRoleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: activeRole.url(options),
    method: 'post',
})

activeRole.form = activeRoleForm

const settings = {
    roleAssignment: Object.assign(roleAssignment, roleAssignmentFd8af0),
    roleMenus: Object.assign(roleMenus, roleMenus),
    activeRole: Object.assign(activeRole, activeRole),
}

export default settings