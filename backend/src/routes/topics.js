import { Router } from 'express'
import {
  getTopics,
  getTopicDetail,
  createTopic,
  updateTopic,
  deleteTopic,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  updateInterest
} from '../controllers/topics.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// Get topics for the logged-in user
router.get('/', authenticate, getTopics)
router.post('/', authenticate, createTopic)

// Update learning interest for user
router.put('/interest', authenticate, updateInterest)

router.get('/:id', authenticate, getTopicDetail)
router.put('/:id', authenticate, updateTopic)
router.delete('/:id', authenticate, deleteTopic)

// Quiz question routes
router.get('/:id/quiz', authenticate, getQuiz)
router.post('/:id/quiz', authenticate, createQuiz)
router.put('/:id/quiz/:quizId', authenticate, updateQuiz)
router.delete('/:id/quiz/:quizId', authenticate, deleteQuiz)

export default router
