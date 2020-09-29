const router = require('express').Router();
const continentController = require('../controllers/continent.controller');

const passport = require('passport');


router.post('/add',passport.authenticate('jwt', { session: false }), continentController.add);
router.post('/update',passport.authenticate('jwt', { session: false }), continentController.update);
router.post('/delete',passport.authenticate('jwt', { session: false }), continentController.delete);
router.get('/getAll', continentController.getAll);
router.get('/:contID', continentController.getByID);


module.exports = router;
