const router = require('express').Router();
const countryController = require('../controllers/country.controller');

const passport = require('passport');


router.post('/add',passport.authenticate('jwt', { session: false }), countryController.add);
router.post('/update',passport.authenticate('jwt', { session: false }), countryController.update);
router.post('/delete',passport.authenticate('jwt', { session: false }), countryController.delete);
router.get('/getAll', countryController.getAll);
router.get('/:ctryID', countryController.getByID);




module.exports = router;
