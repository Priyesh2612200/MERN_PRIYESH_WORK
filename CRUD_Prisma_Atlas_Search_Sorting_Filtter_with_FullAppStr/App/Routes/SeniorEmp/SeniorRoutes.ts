import { Router } from 'express';
import controller from '../../Controller';

const router = Router();


router.post('/saveSeniorEmp',controller.seniorempcontroller.saveSeniorEmp);
router.get('/getSeniorEmp',controller.seniorempcontroller.getSeniorEmp);
router.put('/updateSeniorEmp/:id',controller.seniorempcontroller.updateSeniorEmp);
router.delete('/deleteSeniorEmp/:id',controller.seniorempcontroller.deleteSeniorEmp);

export default router;