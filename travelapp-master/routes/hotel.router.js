const router = require('express').Router();
const hotelController = require('../controllers/hotel.controller');

const passport = require('passport');


router.post('/add',passport.authenticate('jwt', { session: false }), hotelController.add);
router.post('/update',passport.authenticate('jwt', { session: false }), hotelController.update);
router.post('/delete',passport.authenticate('jwt', { session: false }), hotelController.delete);
router.get('/getAll', hotelController.getAll);
router.get('/:hotID', hotelController.getByID);




module.exports = router;
