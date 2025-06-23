import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { getNotes, getRecommendations } from '../controllers/ai.js'

const router = Router()

router.get('/notes', authenticate, getNotes)
router.get('/recommendations', authenticate, getRecommendations)

export default router
