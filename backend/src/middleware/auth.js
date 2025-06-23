// Simple JWT authentication middleware.
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function authenticate(req, res, next) {
  // Tokens are expected to be sent in the Authorization header.
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token provided' })
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}
