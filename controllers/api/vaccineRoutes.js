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
  Vaccine.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(dbVaccineData => res.json(dbVaccineData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// Add a new vaccine to an existing user/pet:
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Vaccine.create({
      veterinarian: req.body.veterinarian,
      vaccine_name: req.body.vaccine_name,
      date_of_vaccine: req.body.date_of_vaccine,
      vaccine_exp_date: req.body.vaccine_exp_date,
      pet_id: req.body.pet_id,
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
    vaccine_exp_date: req.body.vaccine_exp_date
  },{
    where: {
      // user_id: req.session.user_id,
      // pet_id: req.body.pet_id,
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

// Deletion of an existing vaccine for specific user/pet:
router.delete('/:id', withAuth, (req, res) => {
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
    res.json(dbVaccineData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
