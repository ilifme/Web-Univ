import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { JWT_CONFIG } from '../config/jwt.js'
import { successResponse, errorResponse } from '../utils/response.js'
import User from '../models/User.js'

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return errorResponse(res, 'User not found', 404)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid password', 401)
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    )

    successResponse(res, {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    }, 'Login successful')
  } catch (err) {
    next(err)
  }
}

export const logout = async (req, res) => {
  successResponse(res, null, 'Logout successful')
}

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    })

    if (!user) {
      return errorResponse(res, 'User not found', 404)
    }

    successResponse(res, { user })
  } catch (err) {
    next(err)
  }
}
