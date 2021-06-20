const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, BlogPost, BlogComment } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  BlogPost.findAll({
    where: {
      user_id: req.session.user_id
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
  .then(blogPostData => {
    const userBlogPosts = blogPostData.map(post => post.get({ plain: true }));
    res.render('dashboard', { userBlogPosts, loggedIn: true, isDashboard: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/edit/:id', withAuth, (req, res) => {
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
        model: User,
        attributes: ['name']
      },
      {
        model: BlogComment,
        attributes: ['id', 'blog_comment', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      }
    ]
  })
  .then(blogPostInfo => {
    if ( !blogPostInfo ) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }

    const blogPost = blogPostInfo.get({ plain: true });
    res.render('editPost', { blogPost, loggedIn: true, isDashboard: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

})

// Edits to an existing comment:
//   body:
//     post_id: id,
//     subject,
//     description

router.put('/update/:id', withAuth, (req, res) => {
  // console.log( `PUT blog: [${req.params.id}]` );
  // console.log( JSON.stringify( req.body ) );
  BlogPost.update({
    subject: req.body.subject,
    description: req.body.description
  },{
    where: {
      id: req.params.id
    }
  })
  .then(blogPostData => {
    if (!blogPostData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }
    res.json(blogPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// ====================================================================================
// ADD a new blog:

router.get('/new', (req, res) => {
    res.render('newBlogPost');
});

// ====================================================================================
// DELETE an existing blog:

router.delete('/:id', withAuth, async (req, res) => {
  // console.log( `DELETE Blog: [${req.params.id}]` );
  await BlogPost.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(blogPostData => {
    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }
    res.json(blogPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
