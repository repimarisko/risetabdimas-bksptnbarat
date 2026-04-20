import RoleAssignmentController from './RoleAssignmentController'
import RoleMenuController from './RoleMenuController'
import ProfileController from './ProfileController'
import PasswordController from './PasswordController'
import TwoFactorAuthenticationController from './TwoFactorAuthenticationController'

const Settings = {
    RoleAssignmentController: Object.assign(RoleAssignmentController, RoleAssignmentController),
    RoleMenuController: Object.assign(RoleMenuController, RoleMenuController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    PasswordController: Object.assign(PasswordController, PasswordController),
    TwoFactorAuthenticationController: Object.assign(TwoFactorAuthenticationController, TwoFactorAuthenticationController),
}

export default Settings