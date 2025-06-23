import { prisma } from '../config/db.js'

// Return current user's public info
export async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, interest: true, progress: true }
    })
    res.json(user)
  } catch {
    res.status(500).json({ message: 'Failed to fetch user' })
  }
}

// Update progress percentage for the user
export async function updateProgress(req, res) {
  const { progress } = req.body
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { progress: Number(progress) }
    })
    res.json({ progress: user.progress })
  } catch {
    res.status(500).json({ message: 'Failed to update progress' })
  }
}
