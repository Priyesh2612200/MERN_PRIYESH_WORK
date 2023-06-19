import { Router } from 'express';
import controller from '../../Controller';

const router = Router();


router.post('/saveManager',controller.managercontroller.saveManager);
router.get('/getManager',controller.managercontroller.getManager);
router.put('/updateManager/:id',controller.managercontroller.updateManager);
router.delete('/deleteManager/:id',controller.managercontroller.deleteManager);



router.get('/sortingManager',controller.managercontroller.sortingManager);
//localhost:3000/sortingManager?search=Halol&sort=asc


export default router;