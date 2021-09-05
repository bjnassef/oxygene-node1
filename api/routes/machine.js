const express = require('express');
const controller = require('../controllers/machine');
const checkAuth = require('../../middleware/check_auth');
const router = express.Router();

//read all
router.get('/machine',controller.getFreeMachines);

//Create Oxygen Apparatus
router.post('/createmachine',controller.createMachine);

//delete Oxygen Apparatus
router.delete('/deletemachine',controller.deleteMachine);

//update Oxygen Apparatus Statut
router.put('/statutmachine',controller.updateStatus);


module.exports = router;