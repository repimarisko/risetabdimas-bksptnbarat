import PtPenelitianController from './PtPenelitianController'
import AdminPtPenelitianController from './AdminPtPenelitianController'
import AdminPtSkemaController from './AdminPtSkemaController'

const Penelitian = {
    PtPenelitianController: Object.assign(PtPenelitianController, PtPenelitianController),
    AdminPtPenelitianController: Object.assign(AdminPtPenelitianController, AdminPtPenelitianController),
    AdminPtSkemaController: Object.assign(AdminPtSkemaController, AdminPtSkemaController),
}

export default Penelitian