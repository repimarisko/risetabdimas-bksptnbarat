import { createRoute } from './helpers';

export const request = createRoute('/forgot-password');
export const email = createRoute('/forgot-password', 'post');
export const update = createRoute('/reset-password', 'post');
