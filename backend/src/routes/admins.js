import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/adminController.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getAllAdmins)
router.post('/', createAdmin)
router.get('/:id', getAdminById)
router.put('/:id', updateAdmin)
router.delete('/:id', deleteAdmin)

export default router
