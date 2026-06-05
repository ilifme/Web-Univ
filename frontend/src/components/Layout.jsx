import { Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Sidebar from './Sidebar'

export default function Layout() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      logout()
      navigate('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar />
      
      <div className='flex-1 flex flex-col'>
        <nav className='bg-white shadow-sm border-b'>
          <div className='px-6 py-4 flex justify-between items-center'>
            <h2 className='text-lg font-semibold text-gray-800'>Admin Dashboard</h2>
            <div className='flex items-center gap-4'>
              <span className='text-sm text-gray-600'>Hi, {user?.name || "Admin"}</span>
              <button
                onClick={handleLogout}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm'
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <main className='flex-1 overflow-auto p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
