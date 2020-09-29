const router = require('express').Router();
const positionController = require('../controllers/position.controller');

const passport = require('passport');


router.post('/add',passport.authenticate('jwt', { session: false }), positionController.add);
router.post('/update',passport.authenticate('jwt', { session: false }), positionController.update);
router.post('/delete',passport.authenticate('jwt', { session: false }), positionController.delete);
router.get('/getAll', positionController.getAll);
router.get('/:posID', positionController.getByID);



module.exports = router;
