import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleare'

const router = Router()

router.post('/user', new UserController().create)
router.post('/login', new UserController().login)
router.get('/profile', authMiddleware, new UserController().getProfile)
export default router