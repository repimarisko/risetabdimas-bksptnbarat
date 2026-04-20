import { createRoute } from './helpers';

export const edit = createRoute('/settings/profile');
export const update = createRoute('/settings/profile', 'patch');
export const destroy = createRoute('/settings/profile', 'delete');
