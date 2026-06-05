import { errorResponse } from '../utils/response.js'

export const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  console.error('Error:', {
    statusCode,
    message,
    stack: err.stack,
  })

  errorResponse(res, message, statusCode)
}

export default errorHandlerMiddleware
