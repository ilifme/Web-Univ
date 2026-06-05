import Student from '../models/Student.js'
import { successResponse, errorResponse } from '../utils/response.js'

export const getAllStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query

    let where = {}
    if (search) {
      where = {
        [require('sequelize').Op.or]: [
          { name: { [require('sequelize').Op.like]: \%\%\ } },
          { email: { [require('sequelize').Op.like]: \%\%\ } },
          { nisn: { [require('sequelize').Op.like]: \%\%\ } },
        ],
      }
    }

    const offset = (page - 1) * limit
    const { count, rows } = await Student.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    })

    successResponse(res, {
      students: rows,
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

export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id)

    if (!student) {
      return errorResponse(res, 'Student not found', 404)
    }

    successResponse(res, { student })
  } catch (err) {
    next(err)
  }
}

export const createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body)
    successResponse(res, { student }, 'Student created', 201)
  } catch (err) {
    next(err)
  }
}

export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id)

    if (!student) {
      return errorResponse(res, 'Student not found', 404)
    }

    await student.update(req.body)
    successResponse(res, { student }, 'Student updated')
  } catch (err) {
    next(err)
  }
}

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id)

    if (!student) {
      return errorResponse(res, 'Student not found', 404)
    }

    await student.destroy()
    successResponse(res, null, 'Student deleted')
  } catch (err) {
    next(err)
  }
}
