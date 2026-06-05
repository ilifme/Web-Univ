import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacherController.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getAllTeachers)
router.post('/', createTeacher)
router.get('/:id', getTeacherById)
router.put('/:id', updateTeacher)
router.delete('/:id', deleteTeacher)

export default router
