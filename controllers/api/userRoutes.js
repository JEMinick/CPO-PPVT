const router = require('express').Router();
const { User } = require('../../models');

router.post('/newuser', async (req, res) => {
  try {
    // console.log( "POST new user: " );
    // console.log( req.body );
    
    const userData = await User.create({ name: req.body.username, password: req.body.password });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }

});

router.post('/login', async (req, res) => {
  try {
    // console.log( "LOGIN user: " );
    // console.log( req.body );
    const userData = await User.findOne({ where: { name: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect user-name or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect user-name or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
