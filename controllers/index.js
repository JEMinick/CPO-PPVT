const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const profileRoutes = require('./profileRoutes');
const uploadRoutes = require( './uploadRoutes' );

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/uploadimages', uploadRoutes);

module.exports = router;
