const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vaccine extends Model {}

// id
// veterinarian
// vaccine_name
// date_of_vaccine
// vaccine_exp_date
// vaccine_license_file
// user_id
// pet_id
// date_created

Vaccine.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  veterinarian: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vaccine_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_of_vaccine: {
    type: DataTypes.DATEONLY,
    allowNull: false
    // defaultValue: DataTypes.NOW,
  },
  vaccine_exp_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
    // defaultValue: DataTypes.NOW,
  },
  vaccine_license_file: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  pet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_pets',
      key: 'id'
    }
  },
  date_created: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
},{
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'pet_vaccines'
});

module.exports = Vaccine;
