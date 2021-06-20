const User = require('./User');
const Pet = require('./Pet');
const Vaccine = require('./Vaccine');

User.hasMany(Pet, {
    foreignKey: 'user_id'
});
Pet.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

User.hasMany(Vaccine, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});
Vaccine.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Pet.hasMany(Vaccine, {
    foreignKey: 'pet_id',
    onDelete: "cascade"
})
Vaccine.belongsTo(Pet, {
    foreignKey: 'pet_id',
    onDelete: "cascade"
});

module.exports = { User, Pet, Vaccine };

