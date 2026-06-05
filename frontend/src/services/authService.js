import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const authAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// Add token to headers if available
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = \Bearer \\
  }
  return config
})

export const loginUser = async (email, password) => {
  const response = await authAPI.post('/auth/login', { email, password })
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response
}

export const logoutUser = async () => {
  localStorage.removeItem('token')
  return authAPI.post('/auth/logout')
}

export const checkAuth = async () => {
  return authAPI.get('/auth/me')
}

export default authAPI
