const express = require('express');
const controller = require('../controllers/user1');
const checkAuth = require('../../middleware/check_auth');
const multerController = require('../../utilities/multer_setup');
const router = express.Router();

router.get('/xx', controller.getAllUsers);

router.get('/:id', controller.getOneUser);

router.post('/login', controller.userLogin);

router.post('/register', controller.registerNewUser);

router.delete('/all', controller.deleteAllUsers);

router.delete('/', checkAuth, controller.deleteOneUser);

router.put('/name', checkAuth, controller.updateName);

router.put('/username', checkAuth, controller.updateUsername);

router.put('/email', checkAuth, controller.updateEmail);

router.put('/password', checkAuth, controller.updatePassword);

router.put('/address', checkAuth, controller.updateAddress);




module.exports = router;