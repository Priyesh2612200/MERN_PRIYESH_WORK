import express from 'express';
import auth from '../Routes/authroutes/auth'



const router = express.Router();
router.use(auth);

export default router;