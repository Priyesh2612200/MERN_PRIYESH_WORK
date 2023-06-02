import { Router } from 'express';
import controller from '../../Controllers';

const router = Router();


router.post('/savePost',controller.postcontroller.savePost);
router.get('/getPost',controller.postcontroller.getPost);
router.put('/updatePost/:id',controller.postcontroller.updatePost);
router.delete('/deletePost/:id',controller.postcontroller.deletePost);

router.get('/getbyIDPost/:id',controller.postcontroller.getbyid);



export default router;