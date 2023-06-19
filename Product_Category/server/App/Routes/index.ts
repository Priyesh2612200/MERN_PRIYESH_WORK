
import { Request, Response, Router } from 'express';
import {validatecheck} from '../Middleware/validator'
import productController from '../Controller/productController';
import allCategoryController from '../Controller/allCategoryController';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uplodes/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const router = Router();
router.post('/product', upload.single('file'),  validatecheck, productController.productSave);

router.get('allcategory',allCategoryController.getAllCategory)

export default router;
