import express from 'express';
import HrRoutes from './Hr/HrRoutes'
import EmployeeRoutes from './Employee/EmployeeRoutes'
import ManagerRoutes from './Manager/ManagerRoutes'
import SeniorEmpRoutes from './SeniorEmp/SeniorRoutes'

const router = express.Router();

router.use(HrRoutes)
router.use(EmployeeRoutes)
router.use(ManagerRoutes)
router.use(SeniorEmpRoutes)

export default router