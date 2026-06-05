import { Op } from 'sequelize'
import Admin from '../models/Admin.js'
import { successResponse, errorResponse } from '../utils/response.js'

export const getAllAdmins = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query

    let where = {}
    if (search) {
      where = {
        [Op.or]: [
          { name: { [Op.like]: '%' + search + '%' } },
          { email: { [Op.like]: '%' + search + '%' } },
        ],
      }
    }

    const offset = (page - 1) * limit
    const { count, rows } = await Admin.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] },
    })

    successResponse(res, {
      admins: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit),
      },
    })
  } catch (err) {
    next(err)
  }
}

export const getAdminById = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    })

    if (!admin) {
      return errorResponse(res, 'Admin not found', 404)
    }

    successResponse(res, { admin })
  } catch (err) {
    next(err)
  }
}

export const createAdmin = async (req, res, next) => {
  try {
    const { email } = req.body
    const existingAdmin = await Admin.findOne({ where: { email } })

    if (existingAdmin) {
      return errorResponse(res, 'Email already in use', 400)
    }

    const admin = await Admin.create(req.body)
    const adminData = admin.toJSON()
    delete adminData.password

    successResponse(res, { admin: adminData }, 'Admin created', 201)
  } catch (err) {
    next(err)
  }
}

export const updateAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.params.id)

    if (!admin) {
      return errorResponse(res, 'Admin not found', 404)
    }

    const { email } = req.body
    if (email && email !== admin.email) {
      const existingAdmin = await Admin.findOne({ where: { email } })
      if (existingAdmin) {
        return errorResponse(res, 'Email already in use', 400)
      }
    }

    await admin.update(req.body)
    const adminData = admin.toJSON()
    delete adminData.password

    successResponse(res, { admin: adminData }, 'Admin updated')
  } catch (err) {
    next(err)
  }
}

export const deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.params.id)

    if (!admin) {
      return errorResponse(res, 'Admin not found', 404)
    }

    await admin.destroy()
    successResponse(res, null, 'Admin deleted')
  } catch (err) {
    next(err)
  }
}
