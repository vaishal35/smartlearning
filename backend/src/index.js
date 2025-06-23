// Main server file that sets up Express and routes.
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import topicRoutes from './routes/topics.js'
import userRoutes from './routes/user.js'
import aiRoutes from './routes/ai.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Base routes for authentication and topics
app.use('/api/auth', authRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/user', userRoutes)
app.use('/api/ai', aiRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
