import sequelize from '../config/database.js'

const migrate = async () => {
  try {
    await sequelize.authenticate()
    console.log('✓ Database connected')

    await sequelize.sync({ alter: true })
    console.log('✓ Database migrations completed successfully')

    process.exit(0)
  } catch (err) {
    console.error('✗ Migration error:', err)
    process.exit(1)
  }
}

migrate()
