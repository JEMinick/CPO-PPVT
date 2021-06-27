const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const uploadRoutes = require( './uploadRoutes' )

router.use('/', homeRoutes);
router.use('/uploadimg', uploadRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
