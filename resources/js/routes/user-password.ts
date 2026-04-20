import { createRoute } from './helpers';

export const edit = createRoute('/settings/password');
export const update = createRoute('/settings/password', 'put');
