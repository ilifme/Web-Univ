import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Headmaster = sequelize.define('Headmaster', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  nip: {
    type: DataTypes.STRING,
    unique: true,
  },
  address: {
    type: DataTypes.TEXT,
  },
  bio: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  tableName: 'headmasters',
})

export default Headmaster
