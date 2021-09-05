const status = require('../../utilities/server_status');
const roomModel = require('../models/room');
const fileSystem = require('fs');
const dateUtils = require('../../utilities/date_utils');
const notificationModel = require('../models/notification');

const QUERY_DEFAULT_PAGE = 0;
const QUERY_DEFAULT_PAGE_SIZE = 25;
const QUERY_MAX_COUNT = 50;

exports.getUserrooms = (req, res) => {
    const roomId = req.params.id;
    var page = req.query.page;
    var page_size = req.query.page_size;

    if (page == null) {
        page = QUERY_DEFAULT_PAGE;
    }

    if (page_size == null || page_size > QUERY_MAX_COUNT) {
        page_size = QUERY_DEFAULT_PAGE_SIZE;
    }

    const offset = page * page_size;
    
    const args = [roomId, parseInt(page_size), parseInt(offset)];

    questionModel.getQuestionByID(args).then(result => {
        res.status(status.OK).json(result);
    });
};
exports.roomLogin = (req, res) => {
    const code = req.body.code;

   roomModel.loginroom(code).then((result) => {
        if (result[0]) {
            res.status(status.OK).send(result[1])
            console.log ("good Login")

        } else {
            res.status(status.BAD_REQUEST).json({
                message: "Invalid Login",});
        }
    })
};

exports.createNewroom = (req, res) => {
    const title = req.body.title;
    const Code = req.body.code;
    const toUser = req.body.toUser;
    const fromUser = req.body.fromUser;
    const anonymous = req.body.anonymous;
    const currentDate = dateUtils.currentDate();
    const args = [
        title,
        Code,
        toUser,
        fromUser,
        anonymous,
        currentDate
    ];
    roomModel.createNewroom(args).then(result => {
        if (result[0]) {
            const roomid = result[1];
             notificationModel.createQuestionNotification(fromUser, roomid);
            res.status(status.OK).json({
                message: "room created",
            });
        }
        else {
            res.status(status.BAD_REQUEST).json({
                message: "room not created",
            });
        }
    });

};

exports.getRoomByID = (req, res) => {
    const id = req.params.id;
    roomModel.getRoomByID(id).then(result => {
        if (result) {
            res.status(status.OK).json(result[1]);
        } else {
            res.status(status.BAD_REQUEST).json({
                message: "Invalid ID"
            });
        }
    });
};

exports.getCodeByID = (req, res) => {
    const id = req.body.toUser;
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

    roomModel.getCodeByID(args)
        .then(result => {
            console.log(`result ${id}  : ${result.length}`)
            res.status(status.OK).json(result);
        });
};