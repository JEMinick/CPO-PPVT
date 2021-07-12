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
      'pet_license_file',
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
            'vaccine_license_file',
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
      if ( !req.session.loggedIn )
        req.session.loggedIn = false;
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

router.get( '/add-pet', withAuth, (req, res) => {
  console.log( `Render 'new-pet'...` );
  const oNewPet = new Pet;
  const petInfo = oNewPet.get({ plain: true });
  petInfo.id = 0;
  petInfo.petname = '';
  petInfo.pet_license_no = '';
  petInfo.license_exp_date = null;
  petInfo.breed = '';
  petInfo.dob = null;
  petInfo.pet_photo = '';
  petInfo.pet_license_file = '';
  petInfo.pet_photo_local = '';
  petInfo.pet_license_local = '';
  petInfo.user_id = req.session.user_id;
  console.log( `NEW PET JSON:` );
  console.log( petInfo );
  res.render( 'edit-pet', {petInfo, loggedIn: req.session.loggedIn} );
});

// --------------------
// VACCINE model:
// --------------------
// id
// vaccine_name
// date_of_vaccine
// vaccine_exp_date
// veterinarian
// vaccine_license_file
// user_id
// pet_id
// date_created
// --------------------

router.get( '/add-vaccine/:id', withAuth, (req, res) => {
  console.log( `Render 'new-vaccine'...` );
  const oNewVaccine = new Vaccine;
  let vaccineInfo = oNewVaccine.get({ plain: true });
  vaccineInfo.id = 0;
  vaccineInfo.vaccine_name = '';
  vaccineInfo.date_of_vaccine = null;
  vaccineInfo.vaccine_exp_date = null;
  vaccineInfo.veterinarian = '';
  vaccineInfo.vaccine_license_file = '';
  vaccineInfo.vaccine_license_local = '';
  vaccineInfo.user_id = req.session.user_id;
  vaccineInfo.pet_id = req.params.id;
  // console.log( `INITIATING NEW VACCINE JSON:` );
  res.render( 'edit-vaccine', {vaccineInfo, loggedIn: req.session.loggedIn} );
});

module.exports = router;
