import { prisma } from '../config/db.js'

// Fetch all topics from the database. These are not filtered by user
// interest for simplicity but could be extended easily.
export async function getTopics(req, res) {
  try {
    const topics = await prisma.topic.findMany({ select: { id: true, title: true } })
    res.json(topics)
  } catch (err) {
    res.status(500).json({ message: 'Failed to load topics', error: err.message })
  }
}

// Get a single topic including the text for each difficulty level and its quiz
// questions.
export async function getTopicDetail(req, res) {
  const { id } = req.params
  try {
    const topic = await prisma.topic.findUnique({
      where: { id: Number(id) },
      include: { quizzes: true }
    })
    if (!topic) return res.status(404).json({ message: 'Topic not found' })
    // Parse options for each quiz question so the frontend receives arrays
    const withParsed = {
      ...topic,
      quizzes: topic.quizzes.map(q => ({
        id: q.id,
        question: q.question,
        options: JSON.parse(q.options),
        answer: q.answer
      }))
    }
    res.json(withParsed)
  } catch (err) {
    res.status(500).json({ message: 'Failed to load topic', error: err.message })
  }
}

// Create a new topic
export async function createTopic(req, res) {
  const { title, beginner, intermediate, expert } = req.body
  try {
    const topic = await prisma.topic.create({ data: { title, beginner, intermediate, expert } })
    res.status(201).json(topic)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create topic', error: err.message })
  }
}

// Update an existing topic
export async function updateTopic(req, res) {
  const { id } = req.params
  const { title, beginner, intermediate, expert } = req.body
  try {
    const topic = await prisma.topic.update({
      where: { id: Number(id) },
      data: { title, beginner, intermediate, expert }
    })
    res.json(topic)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update topic', error: err.message })
  }
}

// Delete a topic and its quizzes
export async function deleteTopic(req, res) {
  const { id } = req.params
  try {
    await prisma.quiz.deleteMany({ where: { topicId: Number(id) } })
    await prisma.topic.delete({ where: { id: Number(id) } })
    res.json({ message: 'Topic deleted' })
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete topic', error: err.message })
  }
}

// Retrieve quiz questions for a topic
export async function getQuiz(req, res) {
  const { id } = req.params
  try {
    const quizzes = await prisma.quiz.findMany({ where: { topicId: Number(id) } })
    const parsed = quizzes.map(q => ({
      id: q.id,
      question: q.question,
      options: JSON.parse(q.options),
      answer: q.answer
    }))
    res.json(parsed)
  } catch (err) {
    res.status(500).json({ message: 'Failed to load quiz', error: err.message })
  }
}

// Create a new quiz question for a topic
export async function createQuiz(req, res) {
  const { id } = req.params
  const { question, options, answer } = req.body
  try {
    const quiz = await prisma.quiz.create({
      data: {
        topicId: Number(id),
        question,
        options: JSON.stringify(options),
        answer
      }
    })
    res.status(201).json(quiz)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create quiz', error: err.message })
  }
}

// Update an existing quiz question
export async function updateQuiz(req, res) {
  const { quizId } = req.params
  const { question, options, answer } = req.body
  try {
    const quiz = await prisma.quiz.update({
      where: { id: Number(quizId) },
      data: { question, options: JSON.stringify(options), answer }
    })
    res.json(quiz)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update quiz', error: err.message })
  }
}

// Delete a quiz question
export async function deleteQuiz(req, res) {
  const { quizId } = req.params
  try {
    await prisma.quiz.delete({ where: { id: Number(quizId) } })
    res.json({ message: 'Quiz deleted' })
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete quiz', error: err.message })
  }
}

// Update user's area of interest. This is stored on the user record and not
// related to the topics themselves.
export async function updateInterest(req, res) {
  const { interest } = req.body
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { interest }
    })
    res.json({ interest: user.interest })
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message })
  }
}
