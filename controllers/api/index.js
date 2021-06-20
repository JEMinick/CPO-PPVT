const router = require('express').Router();

const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const vaccineRoutes = require('./vaccineRoutes');
// const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/vaccines', vaccineRoutes);
// router.use('/dashboard', dashboardRoutes);

module.exports = router;
