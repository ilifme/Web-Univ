import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { useContext } from 'react'

// Pages
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import TeachersPage from './pages/TeachersPage'
import AdminsPage from './pages/AdminsPage'
import HeadmastersPage from './pages/HeadmastersPage'

// Components
import Layout from './components/Layout'

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>Loading...</div>
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return children
}

function AppRoutes() {
  const { user } = useContext(AuthContext)

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='teachers' element={<TeachersPage />} />
        <Route path='admins' element={<AdminsPage />} />
        <Route path='headmasters' element={<HeadmastersPage />} />
        <Route index element={<Navigate to='dashboard' replace />} />
      </Route>
      <Route path='*' element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
