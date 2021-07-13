const router = require('express').Router();
const { Vaccine } = require('../../models');
const withAuth = require('../../utils/auth');

// Fetching ALL vaccines for a specific user/pet:
router.get('/all/:id', withAuth, (req, res) => {
  Vaccine.findAll({
    where: {
      user_id: req.session.user_id,
      pet_id: req.params.id
    }
  })
  .then(dbVaccineData => res.json(dbVaccineData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// Fetch an existing vaccine:
router.get('/:id', withAuth, (req, res) => {
  // Vaccine.findAll({
  //   where: {
  //     // The id is unique to the specific user/pet...
  //     id: req.params.id
  //   }
  // })
  // .then(dbVaccineData => res.json(dbVaccineData))
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json(err);
  // })
  //----------------------------------------------------------------------------4
  console.log( `\nGET vaccine info: ${req.params.id}` );
  Vaccine.findOne({
    where: {
      id: req.params.id
    }
  })
  .then( dbVaccineRecord => {
    // res.json(petData);
    const vaccineInfo = dbVaccineRecord.get({ plain: true });
    // Create a file name to display on the form:
    vaccineInfo.vaccine_license_local = '';
    if ( vaccineInfo.vaccine_license_file ) {
      if ( vaccineInfo.vaccine_license_file.length ) {
        var tmpArray=vaccineInfo.vaccine_license_file.split('/');
        vaccineInfo.vaccine_license_local = tmpArray[tmpArray.length-1];
      }
    }
    console.log( `\nEDIT vaccine info:` );
    console.log( vaccineInfo );
    // res.json(vaccineInfo);
    res.render( 'edit-vaccine', {vaccineInfo, loggedIn: req.session.loggedIn} );    
  }) 
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  })

});

// Add a new vaccine to an existing user/pet:
router.post('/add', withAuth, (req, res) => {
  console.log( `POST NEW VACCINE for user ${req.session.user_id}:` );
  console.log( req.body );
  if (req.session) {
    Vaccine.create({
      veterinarian: req.body.veterinarian,
      vaccine_name: req.body.vaccine_name,
      date_of_vaccine: req.body.date_of_vaccine,
      vaccine_exp_date: req.body.vaccine_exp_date,
      vaccine_license_file: req.body.vaccine_license_file,
      pet_id: req.body.iPetID,
      user_id: req.session.user_id
    })
    .then(dbVaccineData => {
      res.json(dbVaccineData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  }
});

// Edits to an existing vaccine:
router.put('/:id', withAuth, (req, res) => {
  Vaccine.update({
    veterinarian: req.body.veterinarian,
    vaccine_name: req.body.vaccine_name,
    date_of_vaccine: req.body.date_of_vaccine,
    vaccine_exp_date: req.body.vaccine_exp_date,
    vaccine_license_file: req.body.vaccine_license_file
  },{
    where: {
      // The id is unique to the specific user/pet...
      id: req.params.id
    }
  })
  .then(dbVaccineData => {
    if (!dbVaccineData) {
      res.status(404).json({ message: 'No vaccine found to update using this id!' });
      return;
    }
    res.json(dbVaccineData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Deletion of an existing VACCINE for specific user/pet:
router.get('/del/:id', withAuth, (req, res) => {
  Vaccine.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbVaccineData => {
    if (!dbVaccineData) {
      res.status(404).json({ message: 'No vaccine found to delete using this id!' });
      return;
    }
    // res.json(dbVaccineData);
    res.redirect( '/' );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
