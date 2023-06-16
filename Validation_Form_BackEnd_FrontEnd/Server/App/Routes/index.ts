
import { Request, Response, Router } from 'express';
// import formValidationRules from "../Middleware/validator";
import {validatecheck} from '../Middleware/validator'
import formController from "../Controller/formController";
import express from 'express';
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
router.post('/form', upload.single('file'), validatecheck, formController.saveForm);

export default router;
