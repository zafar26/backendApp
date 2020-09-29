const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

const passport = require('passport');


router.post('/add',passport.authenticate('jwt', { session: false }), employeeController.add);
router.post('/update',passport.authenticate('jwt', { session: false }), employeeController.update);
router.post('/delete',passport.authenticate('jwt', { session: false }), employeeController.delete);




module.exports = router;
