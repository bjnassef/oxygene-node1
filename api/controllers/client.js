const status = require('../../utilities/server_status');
const clientmodel = require('../models/client');
const dateUtils = require('../../utilities/date_utils');

const QUERY_DEFAULT_PAGE = 0;
const QUERY_DEFAULT_PAGE_SIZE = 25;
const QUERY_MAX_COUNT = 50;

exports.getClientByMachine = (req, res) => {
   const idm = req.body.idmachine;
   clientmodel.getClientByMachine(idm).then((result) => {
        if (result[0]) {
            res.status(status.OK).send(result[1])
            console.log ("good Login")

        } else {
            res.status(status.BAD_REQUEST).json({
                message: "Invalid Login",});
        }
    })
};

exports.createNewClient = (req, res) => {
    const CIN = req.body.CIN;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const adress = req.body.adress;
    const phone = req.body.phone;
    const idmachine = req.body.idmachine;
    const args = [
        CIN,
        name,
        lastname,
        adress,
        phone,
        idmachine
    ];
    clientmodel.createNewClient(args).then(result => {
        if (result[0]) {
            res.status(status.OK).json({
                message: "Client created",
            });
        }
        else {
            res.status(status.BAD_REQUEST).json({
                message: "Client not created",
            });
        }
    });

};

exports.getOneClient = (req, res) => {
    const id = req.params.id;
    var cin = req.query.CIN;

    if (cin == null) {
        cin = 0;
    }

    const args = [cin, id]

    clientmodel.getOneClient(args).then(result => { res.status(status.OK).json(result[0]); })
};



exports.getClientByMachine = (req, res) => {
    const idm = req.body.idmachine;
    var page = req.query.page;
    var page_size = req.query.page_size;

    if (page == null) {
        page = QUERY_DEFAULT_PAGE;
    }

    if (page_size == null || page_size > QUERY_MAX_COUNT) {
        page_size = QUERY_DEFAULT_PAGE_SIZE;
    }

    const offset = page * page_size;

    const args = [id, parseInt(page_size), parseInt(offset)];

    clientModel.getClientByMachine(args)
        .then(result => {
            console.log(`result ${idm}  : ${result.length}`)
            res.status(status.OK).json(result);
        });
};

exports.getMachinebyCIN = (req, res) => {
    const id = req.body.CIN;
    var page = req.query.page;
    var page_size = req.query.page_size;

    const offset = page * page_size;

    const args = [id, parseInt(page_size), parseInt(offset)];

    clientModel.getMachinebyCIN(args)
        .then(result => {
            console.log(`result ${id}  : ${result.length}`)
            res.status(status.OK).json(result);
        });
};