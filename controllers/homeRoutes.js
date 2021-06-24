const sequelize = require('../config/connection');
const { User, Pet, Vaccine } = require('../models');
const router = require('express').Router();

// =============================================================================================
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
  

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
