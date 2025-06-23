import { Router } from 'express'
import { register, login } from '../controllers/auth.js'

const router = Router()

// Registration endpoint
router.post('/register', register)
// Login endpoint
router.post('/login', login)

export default router
