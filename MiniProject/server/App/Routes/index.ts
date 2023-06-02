import express from 'express';
import PostRoutes from './PostRoutes/postRoutes'
import UserRoutes from './UserRoutes/userRoutes'

const router = express.Router();

router.use(PostRoutes)
router.use(UserRoutes)


export default router