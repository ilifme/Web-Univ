import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { logoutUser } from '../services/authService'

export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
      navigate('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='bg-blue-600 text-white p-4 shadow'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
          <div className='flex items-center gap-4'>
            <span>Welcome, {user?.name || 'Admin'}</span>
            <button
              onClick={handleLogout}
              className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded'
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className='max-w-7xl mx-auto p-6'>
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-2xl font-bold mb-4'>Dashboard</h2>
          <p className='text-gray-600 mb-4'>Selamat datang di Admin Dashboard Universitas Purbayan</p>
          
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='bg-blue-50 p-4 rounded'>
              <h3 className='font-semibold text-blue-900'>Students</h3>
              <p className='text-2xl font-bold text-blue-600'>-</p>
            </div>
            <div className='bg-green-50 p-4 rounded'>
              <h3 className='font-semibold text-green-900'>Teachers</h3>
              <p className='text-2xl font-bold text-green-600'>-</p>
            </div>
            <div className='bg-yellow-50 p-4 rounded'>
              <h3 className='font-semibold text-yellow-900'>News</h3>
              <p className='text-2xl font-bold text-yellow-600'>-</p>
            </div>
            <div className='bg-purple-50 p-4 rounded'>
              <h3 className='font-semibold text-purple-900'>Announcements</h3>
              <p className='text-2xl font-bold text-purple-600'>-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
