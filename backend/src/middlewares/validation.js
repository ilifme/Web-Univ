export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      })
    }

    req.validatedData = value
    next()
  }
}
