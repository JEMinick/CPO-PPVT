const sequelize = require('../config/connection');
const { User, Pet, Vaccine } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

// =============================================================================================
router.get('/', withAuth, (req, res) => {
  // router.get('/:id', (req, res) => {
  Pet.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'petname',
      'pet_license_no',
      'license_exp_date',
      'breed',
      'dob',
      'pet_photo',
      'date_created',
      'user_id',
      'created_at',
      'updated_at'
    ],
    include: [
      {
        model: Vaccine,
          attributes: [
            'id',
            'veterinarian',
            'vaccine_name',
            'date_of_vaccine',
            'vaccine_exp_date',
            'user_id',
            'pet_id',
            'date_created',
            'created_at',
            'updated_at'
          ]
      },
      {
        model: User,
          attributes: [
            'id',
            'username',
            'email'
            // 'password'
          ]
      }
    ]
  })
  .then(dbPetInfo => {
    const petInfo = dbPetInfo.map(subject => subject.get({ plain: true }));
      // console.log( petInfo );
      if ( !req.session.loggedIn )
        req.session.loggedIn = false;
      // res.status(200).json(petInfo);
      console.log( JSON.stringify(petInfo) );
      res.render('homepage', { petInfo, loggedIn: req.session.loggedIn });    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// =============================================================================================
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// =============================================================================================

router.get( '/addNewPet', withAuth, (req, res) => {
  // if ( req.session.loggedIn ) {
  //   res.redirect('/new-pet');
  //   return;
  // }
  console.log( `Render 'new-pet'...` );
  res.render('new-pet');
  // res.render('new-pet-image');
});

// =============================================================================================
// router.get('/signup', (req, res) => {
//   res.render('signup');
// });

// =============================================================================================
router.get('/blogpost/:id', (req, res) => {
  BlogPost.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'subject',
      'description',
      'date_created'
    ],
    include: [
      {
        model: BlogComment,
        attributes: ['id', 'blog_comment', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
  .then(blogPostInfo => {
    if (!blogPostInfo) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }
    const post = blogPostInfo.get({ plain: true });
    // console.log(post);
    // console.log( `Logged In? [${req.session.loggedIn}] : Rendering: blogPost...` );
    res.render('blogPost', { post, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// =============================================================================================
router.get('/blogpost-comments', (req, res) => {
  BlogPost.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'subject',
      'description',
      'date_created'
    ],
    include: [
      {
        model: BlogComment,
        attributes: ['id', 'blog_comment', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
  .then(blogPostInfo => {
    if ( !blogPostInfo ) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const post = blogPostInfo.get({ plain: true });
    res.render('blogpostcomments', { post, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = router;
