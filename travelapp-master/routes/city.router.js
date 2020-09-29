const router = require('express').Router();
const cityController = require('../controllers/city.controller');

const passport = require('passport');


router.post('/add',passport.authenticate('jwt', { session: false }), cityController.add);
router.post('/update',passport.authenticate('jwt', { session: false }), cityController.update);
router.post('/delete',passport.authenticate('jwt', { session: false }), cityController.delete);
router.get('/getAll', cityController.getAll);
router.get('/:citID', cityController.getByID);




module.exports = router;
