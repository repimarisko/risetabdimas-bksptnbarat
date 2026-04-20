import { createRoute } from '@/routes/helpers';

const PasswordController = {
    update: createRoute('/settings/password', 'put'),
};

export default PasswordController;
