const router = require('express').Router();
const busController = require('../controllers/bus.controller');

const passport = require('passport');


router.post('/add',passport.authenticate('jwt', { session: false }), busController.add);
router.post('/update',passport.authenticate('jwt', { session: false }), busController.update);
router.post('/delete',passport.authenticate('jwt', { session: false }), busController.delete);
router.get('/getAll', busController.getAll);
router.get('/:busID', busController.getByID);




module.exports = router;
