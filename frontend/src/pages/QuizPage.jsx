import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function QuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    api.get(`/topics/${id}/quiz`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setQuestions(res.data))
      .catch(() => alert('Failed to load quiz'))
  }, [id])

  const handleAnswer = choice => {
    if (choice === questions[current].answer) setScore(score + 1)
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      const token = localStorage.getItem('token')
      const progress = Math.round(((score + 1) / questions.length) * 100)
      api.put('/user/progress', { progress }, { headers: { Authorization: `Bearer ${token}` } })
      navigate('/dashboard')
    }
  }

  if (!questions.length) return <div className="p-4">Loading...</div>

  const q = questions[current]

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">{q.question}</h1>
      {q.options.map(o => (
        <button key={o} className="btn block mb-2" onClick={() => handleAnswer(o)}>{o}</button>
      ))}
    </div>
  )
}
