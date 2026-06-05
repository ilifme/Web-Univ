import { Op } from 'sequelize'
import Teacher from '../models/Teacher.js'
import { successResponse, errorResponse } from '../utils/response.js'

export const getAllTeachers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query

    let where = {}
    if (search) {
      where = {
        [Op.or]: [
          { name: { [Op.like]: '%' + search + '%' } },
          { email: { [Op.like]: '%' + search + '%' } },
          { nip: { [Op.like]: '%' + search + '%' } },
        ],
      }
    }

    const offset = (page - 1) * limit
    const { count, rows } = await Teacher.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    })

    successResponse(res, {
      teachers: rows,
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

export const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id)

    if (!teacher) {
      return errorResponse(res, 'Teacher not found', 404)
    }

    successResponse(res, { teacher })
  } catch (err) {
    next(err)
  }
}

export const createTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.create(req.body)
    successResponse(res, { teacher }, 'Teacher created', 201)
  } catch (err) {
    next(err)
  }
}

export const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id)

    if (!teacher) {
      return errorResponse(res, 'Teacher not found', 404)
    }

    await teacher.update(req.body)
    successResponse(res, { teacher }, 'Teacher updated')
  } catch (err) {
    next(err)
  }
}

export const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id)

    if (!teacher) {
      return errorResponse(res, 'Teacher not found', 404)
    }

    await teacher.destroy()
    successResponse(res, null, 'Teacher deleted')
  } catch (err) {
    next(err)
  }
}
