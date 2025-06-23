import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function TopicPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    api.get(`/topics/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setDetail(res.data))
      .catch(() => alert('Failed to load topic'))
  }, [id])

  if (!detail) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl">{detail.title}</h1>
      <p>{detail.levels.beginner}</p>
      <p>{detail.levels.intermediate}</p>
      <p>{detail.levels.expert}</p>
      <button className="btn" onClick={() => navigate(`/quiz/${id}`)}>Take Quiz</button>
    </div>
  )
}
