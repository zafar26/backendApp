const router = require('express').Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');


router.post('/register', userController.register);
router.post('/login', userController.login);


//update user profile
// router.get('/test', passport.authenticate('jwt', { session: false }), userController.test);


module.exports = router;
