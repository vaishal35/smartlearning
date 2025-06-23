import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

// Simple dashboard that fetches topics based on the stored token.
export default function DashboardPage() {
  const [topics, setTopics] = useState([])
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])
  const [recs, setRecs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    api.get('/user/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data))
    api.get('/topics', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTopics(res.data))
      .catch(() => alert('Failed to load topics'))
    api.get('/ai/notes', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setNotes(res.data.notes))
  }, [])

  const saveInterest = () => {
    const token = localStorage.getItem('token')
    api.put('/topics/interest', { interest: user.interest }, { headers: { Authorization: `Bearer ${token}` } })
  }

  const loadRecs = () => {
    const token = localStorage.getItem('token')
    api.get('/ai/recommendations', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setRecs(res.data.recommendations))
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl">Dashboard</h1>
      {user && (
        <div>
          <p className="mb-2">Interest:</p>
          <select className="input" value={user.interest} onChange={e => setUser({ ...user, interest: e.target.value })}>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="Art">Art</option>
            <option value="Technology">Technology</option>
          </select>
          <button className="btn mb-4" onClick={saveInterest}>Save</button>
          <div className="mb-4">
            <p className="mb-1">Progress: {user.progress}%</p>
            <div className="w-full bg-gray-200 h-3 rounded">
              <div className="bg-blue-500 h-3 rounded" style={{ width: `${user.progress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl">Topics</h2>
      <ul className="space-y-2">
        {topics.map(t => (
          <li key={t.id} className="p-3 bg-white shadow cursor-pointer" onClick={() => navigate(`/topic/${t.id}`)}>{t.title}</li>
        ))}
      </ul>

      <div>
        <h2 className="text-xl mt-4">Notes</h2>
        <ul className="list-disc ml-6">
          {notes.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
      </div>

      <button className="btn" onClick={loadRecs}>Show Recommendations</button>
      {recs.length > 0 && (
        <ul className="list-disc ml-6 mt-2">
          {recs.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      )}
    </div>
  )
}
