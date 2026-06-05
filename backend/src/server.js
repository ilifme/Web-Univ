import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'express-async-errors'
import dotenv from 'dotenv'

import sequelize from './config/database.js'
import routes from './routes/index.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api', routes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use(errorHandlerMiddleware)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected successfully')

    await sequelize.sync({ alter: false })
    console.log('Database models synced')

    app.listen(PORT, () => {
      console.log('Server running on http://localhost:' + PORT)
      console.log('API available at http://localhost:' + PORT + '/api')
    })
  } catch (err) {
    console.error('Server startup error:', err)
    process.exit(1)
  }
}

startServer()

export default app
