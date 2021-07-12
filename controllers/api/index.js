const router = require('express').Router();

const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const vaccineRoutes = require('./vaccineRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/vaccines', vaccineRoutes);

module.exports = router;
