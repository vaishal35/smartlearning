import { useFormik } from 'formik'
import * as Yup from 'yup'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

// Registration form collects user info and validates with Yup
export default function RegisterPage() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      age: '',
      interest: 'Math'
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Min 6 chars').required('Required'),
      age: Yup.number().min(1).required('Required'),
      interest: Yup.string().required('Required')
    }),
    onSubmit: async values => {
      try {
        await api.post('/auth/register', values)
        navigate('/login')
      } catch (err) {
        alert('Registration failed')
      }
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl mb-4">Register</h1>
        <input className="input" placeholder="Username" {...formik.getFieldProps('username')} />
        {formik.touched.username && formik.errors.username && <div className="text-red-500 text-sm">{formik.errors.username}</div>}
        <input className="input" placeholder="Email" {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
        <input className="input" type="password" placeholder="Password" {...formik.getFieldProps('password')} />
        {formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}
        <input className="input" placeholder="Age" {...formik.getFieldProps('age')} />
        {formik.touched.age && formik.errors.age && <div className="text-red-500 text-sm">{formik.errors.age}</div>}
        <select className="input" {...formik.getFieldProps('interest')}>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Art">Art</option>
          <option value="Technology">Technology</option>
        </select>
        <button type="submit" className="btn mt-2 w-full">Register</button>
        <p className="text-sm mt-2">Already registered? <a href="/login" className="text-blue-500">Login</a></p>
      </form>
    </div>
  )
}
