const database = require('../../database/config');

exports.makeUserOnline = toUser => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET active = 1 WHERE id = ?';

    database.query(updateQuery, toUser, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
           return resolve(true);
        } else {
            return  resolve(false);
        }
    });
});

exports.makeUserOffline = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET active = 0 WHERE id = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});