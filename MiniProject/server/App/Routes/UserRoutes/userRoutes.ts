import { Router } from "express";
// import authcontroller from '../../Controller/auth/authcontroller'
import usercontroller from '../../Controllers/UserController/userController'
import { auth } from "../../Middleware/verifytoken";



const router = Router();

router.post('/userroutes/register',usercontroller.register)
router.post('/userroutes/login',usercontroller.login);

router.get('/userroutes/getdata',auth,usercontroller.verifytoken);

router.get('/userroutes/getalldata',usercontroller.getalldata);

router.put('/userroutes/userupdatedata/:id',auth,usercontroller.updateuserdata);

router.delete('/userroutes/userdeletedata/:id',usercontroller.deleteuserdata);
export default router;
