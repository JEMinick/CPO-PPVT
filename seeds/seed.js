const sequelize = require('../config/connection');
const { User, Pet, Vaccine } = require('../models');

const userData = require('./userData.json');
const petData = require('./petData.json');
const vaccineData = require('./vaccineData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const petInfo of petData) {
    await Pet.create({
      ...petInfo
    });
  }

  for (const petVaccine of vaccineData) {
    await Vaccine.create({
      ...petVaccine
    });
  }

  process.exit(0);
};

seedDatabase();
