import Dashboard from './Dashboard'
import Users from './Users'
import Settings from './Settings'
import Penelitian from './Penelitian'

const Controllers = {
    Dashboard: Object.assign(Dashboard, Dashboard),
    Users: Object.assign(Users, Users),
    Settings: Object.assign(Settings, Settings),
    Penelitian: Object.assign(Penelitian, Penelitian),
}

export default Controllers