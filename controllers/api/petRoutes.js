const router = require('express').Router();
const { User, Pet, Vaccine } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieve record for an existing pet:
router.get('/retrieve/:id', withAuth, (req, res) => {
  // console.log( `\nGET pet info: ${req.params.id}` );

  // Pet.findOne({
  //   where: {
  //     id: req.params.id
  //   }
  // })

  Pet.findOne({
    where: {
      id: req.params.id
    },
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
      {
        model: User,
        attributes: [
          'id',
          'username',
          'email',
          'password'
        ]
      }
    ]
  })
  
  .then( dbPetRecord => {
    // res.json(petData);
    const petInfo = dbPetRecord.get({ plain: true });
    // Create a file name to display on the form:
    petInfo.pet_photo_local = '';
    if ( petInfo.pet_photo ) {
      if ( petInfo.pet_photo.length ) {
        var tmpArray=petInfo.pet_photo.split('/');
        petInfo.pet_photo_local = tmpArray[tmpArray.length-1];
      }
    }
    // Create a file name to display on the form:
    petInfo.pet_license_local = '';
    if ( petInfo.pet_license_file ) {
      if ( petInfo.pet_license_file.length ) {
        var tmpArray=petInfo.pet_license_file.split('/');
        petInfo.pet_license_local = tmpArray[tmpArray.length-1];
      }
    }
    // console.log( `\nRETRIEVED pet info:` );
    // console.log( petInfo );
    res.status(200).json(petInfo);
    // res.render( 'edit-pet', {petInfo, loggedIn: req.session.loggedIn} );    
  }) 
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// Fetch and edit an existing pet:
router.get('/edit/:id', withAuth, (req, res) => {
  // console.log( `\nGET pet info: ${req.params.id}` );
  Pet.findOne({
    where: {
      id: req.params.id
    }
  })
  .then( dbPetRecord => {
    // res.json(petData);
    const petInfo = dbPetRecord.get({ plain: true });
    // Create a file name to display on the form:
    petInfo.pet_photo_local = '';
    if ( petInfo.pet_photo ) {
      if ( petInfo.pet_photo.length ) {
        var tmpArray=petInfo.pet_photo.split('/');
        petInfo.pet_photo_local = tmpArray[tmpArray.length-1];
        if ( petInfo.pet_photo_local ) {
          if ( petInfo.pet_photo_local.length ) {
            var tmpArray2=petInfo.pet_photo.split('---');
            if ( tmpArray2.length == 2 ) {
              petInfo.pet_photo_local = tmpArray2[tmpArray2.length-1];
            }
          }
        }
      }
    }
    // Create a file name to display on the form:
    petInfo.pet_license_local = '';
    if ( petInfo.pet_license_file ) {
      if ( petInfo.pet_license_file.length ) {
        var tmpArray=petInfo.pet_license_file.split('/');
        petInfo.pet_license_local = tmpArray[tmpArray.length-1];
        if ( petInfo.pet_license_local ) {
          if ( petInfo.pet_license_local.length ) {
            var tmpArray2=petInfo.pet_license_local.split('---');
            if ( tmpArray2.length == 2 ) {
              petInfo.pet_license_local = tmpArray2[tmpArray2.length-1];
            }
          }
        }
      }
    }
    console.log( `\nEDIT pet info:` );
    console.log( petInfo );
    res.render( 'edit-pet', {petInfo, loggedIn: req.session.loggedIn} );    
  }) 
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// ADD a new PET:
router.post('/add', withAuth, async (req, res) => {
  console.log( `POST new pet: [${req.body}]` );
  try {
    const dbPetData = await Pet.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(dbPetData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE an existing PET:
router.put('/:id', withAuth, async (req, res) => {
  await Pet.update({
    petname: req.body.petname,
    pet_license_no: req.body.pet_license_no,
    license_exp_date: req.body.license_exp_date,
    breed: req.body.breed,
    dob: req.body.dob,
    pet_photo: req.body.pet_photo,
    pet_license_file: req.body.pet_license_file
  },{
    where: {
      id: req.params.id
    }
  })
  .then(petInfo => {
    if (!petInfo) {
      res.status(404).json({ message: 'No pet found to update using this id!' });
      return;
    }
    res.json(petInfo);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE an existing PET:
// router.get('/del/:id', withAuth, async (req, res) => {
//   try {
//     const petInfo = await Pet.destroy({
//       where: {
//         id: req.params.id
//         // user_id: req.session.user_id
//       },
//     });

//     if (!petInfo) {
//       res.status(404).json({ message: 'No pet found to delete using this id!' });
//       return;
//     }

//     res.status(200).json(petInfo);
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const petInfo = await Pet.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!petInfo) {
      res.status(404).json({ message: 'No pet found to delete using this id!' });
      return;
    }

    res.status(200).json(petInfo);
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
// router.get('/delete/:id', withAuth, (req, res) => {
//   console.log( `\nDELETE PET: [${req.params.id}]` );
//   Pet.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then( dbPetRecord => {
//     // res.json(petData);
//     const petInfo = dbPetRecord.get({ plain: true });
//     console.log( `\nDELETE pet info:` );
//     console.log( petInfo );
//     // req.session.loggedIn = false;
//     // res.status(200).json(petInfo);
//     // res.render( '/', {petInfo, loggedIn: req.session.loggedIn} );    
//   }) 
//   .catch( err => {
//     console.log(err);
//     res.status(500).json(err);
//   })
// });

module.exports = router;
