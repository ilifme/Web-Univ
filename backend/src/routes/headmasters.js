import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import {
  getAllHeadmasters,
  getHeadmasterById,
  createHeadmaster,
  updateHeadmaster,
  deleteHeadmaster,
} from '../controllers/headmasterController.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getAllHeadmasters)
router.post('/', createHeadmaster)
router.get('/:id', getHeadmasterById)
router.put('/:id', updateHeadmaster)
router.delete('/:id', deleteHeadmaster)

export default router
