import { Router } from "express";
import stockController from "../../Controller/Stock/stockController";
import orderController from "../../Controller/Order/orderController";

const router = Router();

router.post('/createStock',stockController.createStock)
router.get('/getStock',stockController.getStock)
router.delete('/deleteStock/:id',stockController.deleteStock);

router.post('/createOrder',orderController.createOrder);
router.get('/getorder',orderController.getOrder);
export default router;