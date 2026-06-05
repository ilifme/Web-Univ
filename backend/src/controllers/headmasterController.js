import { Op } from 'sequelize'
import Headmaster from '../models/Headmaster.js'
import { successResponse, errorResponse } from '../utils/response.js'

export const getAllHeadmasters = async (req, res, next) => {
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
    const { count, rows } = await Headmaster.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    })

    successResponse(res, {
      headmasters: rows,
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

export const getHeadmasterById = async (req, res, next) => {
  try {
    const headmaster = await Headmaster.findByPk(req.params.id)

    if (!headmaster) {
      return errorResponse(res, 'Headmaster not found', 404)
    }

    successResponse(res, { headmaster })
  } catch (err) {
    next(err)
  }
}

export const createHeadmaster = async (req, res, next) => {
  try {
    const headmaster = await Headmaster.create(req.body)
    successResponse(res, { headmaster }, 'Headmaster created', 201)
  } catch (err) {
    next(err)
  }
}

export const updateHeadmaster = async (req, res, next) => {
  try {
    const headmaster = await Headmaster.findByPk(req.params.id)

    if (!headmaster) {
      return errorResponse(res, 'Headmaster not found', 404)
    }

    await headmaster.update(req.body)
    successResponse(res, { headmaster }, 'Headmaster updated')
  } catch (err) {
    next(err)
  }
}

export const deleteHeadmaster = async (req, res, next) => {
  try {
    const headmaster = await Headmaster.findByPk(req.params.id)

    if (!headmaster) {
      return errorResponse(res, 'Headmaster not found', 404)
    }

    await headmaster.destroy()
    successResponse(res, null, 'Headmaster deleted')
  } catch (err) {
    next(err)
  }
}
