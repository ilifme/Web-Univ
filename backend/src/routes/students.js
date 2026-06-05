import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getAllStudents)
router.post('/', createStudent)
router.get('/:id', getStudentById)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router
