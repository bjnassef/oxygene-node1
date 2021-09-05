const status = require('../../utilities/server_status');
const machineModel = require('../models/machine');
const fileSystem = require('fs');
const dateUtils = require('../../utilities/date_utils');

const QUERY_DEFAULT_PAGE = 0;
const QUERY_DEFAULT_PAGE_SIZE = 25;
const QUERY_MAX_COUNT = 50;


exports.getFreeMachines = (req, res) => {
    var idmachine = req.query.idmachine;
    var page = req.query.page;
    var page_size = req.query.page_size;

    if (idmachine == null) {
        idmachine = 0;
    }

    if (page == null) {
        page = QUERY_DEFAULT_PAGE;
    }

    if (page_size == null || page_size > QUERY_MAX_COUNT) {
        page_size = QUERY_DEFAULT_PAGE_SIZE;
    }

    const offset = page * page_size;

    const args = [idmachine, parseInt(page_size), parseInt(offset)];

    machineModel.getFreeMachine(args).then(result => {
        res.status(status.OK).json(result)
    });
};


exports.createMachine = (req, res) => {
    const name = req.body.name;
    const qteoxy = req.body.qteoxy;
    const description = req.body.description;
    const iduser = req.session.iduser;
    const statut = "False";

    const args = [
        name,
        qteoxy,
        description,
        iduser,
        statut
    ];

    machineModel.createMachine(args).then(result => {
        if (result[0]) {
            const idmachine = result[1];
            res.status(status.OK).json({
                message: "Machine created",
            });
        }
        else {
            res.status(status.BAD_REQUEST).json({
                message: "Machine not created",
            });
        }
    });
};


exports.deleteMachine = (req, res) => {
    const idmachine = req.body.idmachine;
    machineModel.deleteOnemachine(idmachine).then(state => {
        if (state) {
            res.status(status.OK).json({
                message: "Machine is deleted",
            });
        } else {
            res.status(status.BAD_REQUEST).json({
                message: "Machine can't be deleted"
            });
        }
    })
};


exports.updateStatus = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE machine SET STATUS = ? WHERE idmachine =';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});
