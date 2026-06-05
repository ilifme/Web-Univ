import sequelize from '../config/database.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

const seed = async () => {
  try {
    await sequelize.authenticate()
    console.log('✓ Database connected')

    // Create default admin user
    const existingAdmin = await User.findOne({ where: { email: 'admin@universitas.ac.id' } })

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('password123', 10)
      await User.create({
        name: 'Admin',
        email: 'admin@universitas.ac.id',
        password: hashedPassword,
        role: 'admin',
      })
      console.log('✓ Admin user created')
    } else {
      console.log('✓ Admin user already exists')
    }

    console.log('✓ Seeding completed successfully')
    process.exit(0)
  } catch (err) {
    console.error('✗ Seeding error:', err)
    process.exit(1)
  }
}

seed()
