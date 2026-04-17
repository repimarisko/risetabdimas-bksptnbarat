import { createRoute } from '@/routes/helpers';

const ProfileController = {
    update: createRoute('/settings/profile', 'patch'),
    destroy: createRoute('/settings/profile', 'delete'),
};

export default ProfileController;
