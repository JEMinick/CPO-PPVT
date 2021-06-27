const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const uploadRoutes = require( './uploadRoutes' );
// const uploadImages = require( './upload-image' );

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/uploadimg', uploadRoutes);
// router.use('/upload', uploadImages);

module.exports = router;
