const express = require('express');
const controller = require('../controllers/client');
const checkAuth = require('../../middleware/check_auth');
const router = express.Router();

//Create Client
router.post('/createclient',controller.createNewClient);

//Getclientbymachine
router.get('/get_cl_mc_id',controller.getClientByMachine);

//getidmachinebycin
router.get('/get_machine_cin',controller.getMachinebyCIN);

//GetOneclient
router.get('/getonecl',controller.getOneClient);


module.exports = router;