const router = require('express').Router();
const { BlogComment } = require('../../models');
const withAuth = require('../../utils/auth');

// Fetching ALL comments:
router.get('/', (req, res) => {
  BlogComment.findAll({})
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// Fetching an existing comment:
router.get('/:id', (req, res) => {
  BlogComment.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// Adding a new comment:
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    BlogComment.create({
      blog_comment: req.body.comment_text,
      post_id: req.body.postId,
      user_id: req.session.user_id,
    })
    .then(dbCommentData => {
      res.json(dbCommentData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  }
});

// Edits to an existing comment:
router.put('/:id', withAuth, (req, res) => {
  BlogComment.update({
    comment_text: req.body.blog_comment
  },{
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Deletion of an existing comment:
router.delete('/:id', withAuth, (req, res) => {
  BlogComment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
