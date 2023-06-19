import { Router } from 'express';
import controller from '../../Controller';

const router = Router();


router.post('/saveUser',controller.userController.saveUser);
router.get('/getUser',controller.userController.getUser);
router.put('/updatedata/:id',controller.userController.updatedata);
router.delete('/deletedata/:id',controller.userController.deletedata);

router.get('/getResult',controller.userController.getresult);

export default router;