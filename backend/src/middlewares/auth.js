import jwt from 'jsonwebtoken'
import { JWT_CONFIG } from '../config/jwt.js'
import { errorResponse } from '../utils/response.js'

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return errorResponse(res, 'Token not found', 401)
    }

    const decoded = jwt.verify(token, JWT_CONFIG.secret)
    req.user = decoded
    next()
  } catch (err) {
    return errorResponse(res, 'Invalid token', 401)
  }
}

export default authMiddleware
