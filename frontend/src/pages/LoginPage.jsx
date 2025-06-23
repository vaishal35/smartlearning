import { useFormik } from 'formik'
import * as Yup from 'yup'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

// Basic login form. On success a token is stored and user is redirected.
export default function LoginPage() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: async values => {
      try {
        const res = await api.post('/auth/login', values)
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
      } catch (err) {
        alert('Login failed')
      }
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl mb-4">Login</h1>
        <input className="input" placeholder="Username" {...formik.getFieldProps('username')} />
        {formik.touched.username && formik.errors.username && <div className="text-red-500 text-sm">{formik.errors.username}</div>}
        <input className="input" type="password" placeholder="Password" {...formik.getFieldProps('password')} />
        {formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}
        <button type="submit" className="btn mt-2 w-full">Login</button>
        <p className="text-sm mt-2">Need an account? <a href="/" className="text-blue-500">Register</a></p>
      </form>
    </div>
  )
}
