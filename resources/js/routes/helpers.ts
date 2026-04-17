export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface WayfinderTarget {
    method: HttpMethod;
    url: string;
}

export interface WayfinderRoute {
    (): WayfinderTarget;
    url(): string;
    form(): {
        action: string;
        method: HttpMethod;
    };
}

export function createRoute(
    url: string,
    method: HttpMethod = 'get',
): WayfinderRoute {
    const makeTarget = () => ({
        method,
        url,
    });

    const route = makeTarget as WayfinderRoute;
    route.url = () => url;
    route.form = () => ({
        action: url,
        method,
    });

    return route;
}
