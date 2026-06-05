import express from 'express'
import authRoutes from './auth.js'
import studentRoutes from './students.js'
import teacherRoutes from './teachers.js'
import adminRoutes from './admins.js'
import headmasterRoutes from './headmasters.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/students', studentRoutes)
router.use('/teachers', teacherRoutes)
router.use('/admins', adminRoutes)
router.use('/headmasters', headmasterRoutes)

export default router
