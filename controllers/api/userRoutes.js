const router = require('express').Router();
const { User, Pet, Vaccine } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/newuser', async (req, res) => {
  try {
    // console.log( "POST new user: " );
    // console.log( req.body );
    
    const userData = await User.create({ 
      username: req.body.username, 
      email: req.body.email, 
      password: req.body.password 
    });

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
    console.log( "LOGIN user: " );
    console.log( req.body );
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect user-email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect user-email or password, please try again' });
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

// DELETE an existing USER:
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const userInfo = await User.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!userInfo) {
      res.status(404).json({ message: 'No user found to delete using this id!' });
      return;
    }

    // res.status(200).json(userInfo);
    req.session.loggedIn = false;
    req.session.user_id = 0;
    res.render( 'login' );
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------------
// Added this route to 'simulate' a delete, without
// actually executing the delete itself..
// the actual call is:
//   /del/:id
// whereas this 'simulated' call is:
//   /delete/:id
// --------------------------------------------------------
router.get('/delete/:id', withAuth, (req, res) => {
  console.log( `\nDELETE USER: [${req.params.id}]` );
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then( dbUserRecord => {
    // res.json(petData);
    const userInfo = dbUserRecord.get({ plain: true });
    console.log( `\nDELETE user info:` );
    console.log( userInfo );
    req.session.loggedIn = false;
    res.status(200).json(userInfo);
    // res.render( 'edit-pet', {petInfo, loggedIn: req.session.loggedIn} );    
  }) 
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// ==========================================================================
// UPDATE an existing USER:
// id  :: NOT NULL
// username :: NOT NULL
// email :: NOT NULL
// password :: NOT NULL
router.put('/:id', withAuth, async (req, res) => {
  await User.update({
    username: req.body.username,
    email: req.body.email
  },{
    where: {
      id: req.params.id
    }
  })
  .then(userInfo => {
    if (!userInfo) {
      res.status(404).json({ message: 'No user found to update using this id!' });
      return;
    }
    res.status(200).json(userInfo);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// ==========================================================================
// Retrieve a commplete record for an existing user:
router.get('/retrieve/:id', withAuth, (req, res) => {
  // console.log( `\nGET user info: ${req.params.id}` );

  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'username',
      'email'
    ],
    include: [
      {
        model: Pet,
        attributes: [
          'id',
          'petname',
          'pet_license_no',
          'license_exp_date',
          'breed',
          'dob',
          'pet_photo',
          'pet_license_file',
          'date_created',
          'user_id'
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
              'vaccine_license_file',
              'user_id',
              'pet_id',
              'date_created'
            ]
          },
        ],
      },
    ]
  })
  
  .then( dbUserRecord => {
    const userInfo = dbUserRecord.get({ plain: true });
    // Create a 'local' file name from the public google URL:
    // userInfo.user_photo_local = '';
    // if ( userInfo.user_photo ) {
    //   if ( userInfo.user_photo.length ) {
    //     var tmpArray=userInfo.user_photo.split('/');
    //     userInfo.user_photo_local = tmpArray[tmpArray.length-1];
    //   }
    // }
    console.log( `\nRETRIEVED user info:` );
    console.log( userInfo );
    res.status(200).json(userInfo);
  }) 
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
