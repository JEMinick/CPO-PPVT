// module.exports = Post;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Pet model
class Pet extends Model {}

// create fields/columns for the Pet model
Pet.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  petname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pet_license_no: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  license_exp_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  breed: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
    // defaultValue: DataTypes.NOW,
  },
  pet_photo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date_created: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
},{
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'user_pets'
});

module.exports = Pet;
