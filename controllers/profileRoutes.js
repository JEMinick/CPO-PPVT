const router = require('express').Router();
const sequelize = require('../config/connection');

// const { User, BlogPost, BlogComment } = require('../models');
const { User } = require('../models');

const withAuth = require('../utils/auth');

// ====================================================================================
// router.get('/', withAuth, (req, res) => {
//   res.render('profile', { loginid: req.session.user_id, loggedIn: true, isDashboard: true });
// })
// --------------------------------------------------------------

// id  :: NOT NULL
// username :: NOT NULL
// email :: NOT NULL
// password :: NOT NULL

router.get('/', withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: [
      'id',
      'username',
      'email',
      'password'
    ],
  })
  .then( dbUserRecord => {
    const userInfo = dbUserRecord.get({ plain: true });
    res.render( 'profile', { userInfo, loggedIn: true, isDashboard: true } );
  })
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  })
  
});

// ====================================================================================

module.exports = router;
