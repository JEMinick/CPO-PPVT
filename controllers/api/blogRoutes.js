const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// ADD a new Blog Post:
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newBlog);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE an existing Blog Post:
router.put('/:id', withAuth, async (req, res) => {
  await BlogPost.update({
    title: req.body.subject,
    content: req.body.description
  },{
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

// DELETE an existing Blog Post:
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
