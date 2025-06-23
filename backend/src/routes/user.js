import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { getMe, updateProgress } from '../controllers/user.js'

const router = Router()

router.get('/me', authenticate, getMe)
router.put('/progress', authenticate, updateProgress)

export default router
