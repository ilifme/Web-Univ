import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'

// Pages
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route 
          path='/dashboard' 
          element={user ? <DashboardPage /> : <Navigate to='/login' />} 
        />
        <Route path='/' element={<Navigate to={user ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  )
}

export default App
