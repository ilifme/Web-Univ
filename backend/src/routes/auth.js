import express from 'express'
import { login, logout, getCurrentUser } from '../controllers/authController.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authMiddleware, getCurrentUser)

export default router
