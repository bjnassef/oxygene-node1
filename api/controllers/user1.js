const status = require('../../utilities/server_status');
const userModel = require('../models/user1');
const fileSystem = require('fs');
const dateUtils = require('../../utilities/date_utils');

const QUERY_DEFAULT_PAGE = 0;
const QUERY_DEFAULT_PAGE_SIZE = 25;
const QUERY_MAX_COUNT = 50;

exports.userLogin = (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    userModel.login(email, password).then((result) => {
        if (result[0]) {
            const vv = result[1]['id'];
            res.status(status.OK).send(result[1])

        } else {
               res.status(status.BAD_REQUEST).json({
                message: "Invalid Login",
            });
        }
    })
};

exports.registerNewUser = (req, res) => {
    const id = req.body.id
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const adress = req.body.address;

    const info = [
        email.toLowerCase(),
        username.toLowerCase(),
    ];

    userModel.isAvailableInfo(info).then(result => {
        const isAvailable = result[0];
        if (isAvailable) {
            userModel.hashPassword(password).then(hashedPassword => {
                const user = [
                    id,
                    name,
                    username,
                    email,
                    hashedPassword,
                    adress
                ];

                userModel.register(user).then(result => {
                    if (result[0]) {
                        res.status(status.OK).json(result[1]);
                    } else {
                        res.status(status.BAD_REQUEST).send("Invalid Register");
                    }
                });
            });
        } else {
            const current = result[1][0]['email'];
            if (current == email) {
                return res.status(status.BAD_REQUEST).send("Invalid Email");
            } else {
                return res.status(status.BAD_REQUEST).send("Invalid username")
            }
        }
    });
};

exports.getAllUsers = (req, res) => {
    var id = req.query.id;
    var page = req.query.page;
    var page_size = req.query.page_size;

    if (id == null) {
        id = 0;
    }

    if (page == null) {
        page = QUERY_DEFAULT_PAGE;
    }

    if (page_size == null || page_size > QUERY_MAX_COUNT) {
        page_size = QUERY_DEFAULT_PAGE_SIZE;
    }

    const offset = page * page_size;

    const args = [id, parseInt(page_size), parseInt(offset)];

    userModel.queryUsers(args).then(result => {
        res.status(status.OK).json(result)
    });
};

exports.getOneUser = (req, res) => {
    const id = req.params.id;
    var userId = req.query.userId;

    if (userId == null) {
        userId = 0;
    }

    const args = [userId, id]

    userModel.getOneUser(args).then(result => { res.status(status.OK).json(result[0]); })
};


exports.deleteAllUsers = (req, res) => {
    userModel.deleteUsers().then(state => {
        if (state) {
            res.status(status.OK).json({
                message: "All is deleted",
            });
        } else {
            res.status(status.BAD_REQUEST).json({
                message: "Can't Delete All"
            });
        }
    });
};

exports.deleteOneUser = (req, res) => {
    const email = req.body.email.toLowerCase();
    userModel.deleteOneUser(email).then(state => {
        if (state) {
            res.status(status.OK).json({
                message: "User is deleted",
            });
        } else {
            res.status(status.BAD_REQUEST).json({
                message: "Can't Delete User"
            });
        }
    })
};

exports.updateName = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET name = ? WHERE email = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});

exports.updateUsername = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET username = ? WHERE email = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});

exports.updateEmail = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET email = ? WHERE email = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});

exports.updatePassword = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    })
});

exports.updateAddress = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET address = ? WHERE id = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});



exports.updateEmail = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET email = ? WHERE email = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});

exports.updatePassword = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    })
});