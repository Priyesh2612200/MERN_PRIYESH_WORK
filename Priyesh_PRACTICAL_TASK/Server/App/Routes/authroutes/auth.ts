import { Router } from "express";
import authcontroller from '../../Controller/auth/authcontroller'
import  { validatecheck } from "../../Middleware/validator";
import { auth } from "../../Middleware/verifytoken";
import suppliercontroller from "../../Controller/supplier/suppliercontroller";
import invoicescontroller from "../../Controller/invoice_details/invoicescontroller";


const router = Router();

router.post('/authroutes/register',validatecheck,authcontroller.register)
router.post('/authroutes/login',validatecheck,authcontroller.login);
router.get('/authroutes/getdata',auth,authcontroller.verifytoken);
router.put('/authroutes/updatedata/:id',authcontroller.updateuserdata);

router.get('/authroutes/getalldata',authcontroller.getalldata);

router.get('/authroutes/supplier',suppliercontroller.getsupplier);

router.post('/authroutes/postinvoicedetails',invoicescontroller.postinvoices)
router.get('/authroutes/getinvoicedetails',invoicescontroller.getinvoices)
router.put('/authroutes/updateinvoicedetails',invoicescontroller.updateinvoices)

router.post('/authroutes/send-email',invoicescontroller.sendEmail)

router.post('/authroutes/getpdfdata',invoicescontroller.detaPdfData)

export default router;