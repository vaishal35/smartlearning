import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { prisma } from '../config/db.js'

dotenv.config()

// Handle user registration
export async function register(req, res) {
  const { username, email, password, age, interest } = req.body
  try {
    // Hash the password before saving
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { username, email, password: hashed, age: Number(age), interest }
    })
    return res.json({ message: 'User created', user: { id: user.id, username: user.username } })
  } catch (err) {
    return res.status(400).json({ message: 'Registration failed', error: err.message })
  }
}

// Handle user login
export async function login(req, res) {
  const { username, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })

    // Sign a JWT token with the user id
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
    return res.json({ token })
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message })
  }
}
