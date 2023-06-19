import { Router } from 'express';
import controller from '../../Controller';

const router = Router();


router.post('/saveemp',controller.empcontroller.saveemp);
router.get('/getemp',controller.empcontroller.getemp);
router.put('/updateemp/:id',controller.empcontroller.updateemp);
router.delete('/deleteemp/:id',controller.empcontroller.deleteemp);

export default router;