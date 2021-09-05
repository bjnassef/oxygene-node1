const database = require('../../database/config');
const bcrypt = require('bcrypt');


exports.queryMachine= args => new Promise((resolve, reject) => {
    const query = `SELECT 
    machine.idmachine,
    machine.name,
    machine.qteoxy,
    machine.description,
    machine.STATUS,
FROM machine
LIMIT ? OFFSET ? `;

    database.query(query, args, (err, result) => {
        if (err) throw err;
        resolve(result);
    });
});


exports.getFreeMachine = args => new Promise((resolve, reject) => {
    etat = false;
    const query = `SELECT DISTINCT machine.idmachine, 
    machine.NAME, 
    machine.qteoxy, 
    machine.description, 
    machine.iduser, 
    machine.STATUT
     FROM machine
     WHERE machine.STATUT = `+ etat ;
database.query(query, args, (err, result) => {
    if (err) throw err;
    resolve(result);
});
});


exports.createMachine = args => new Promise((resolve, reject) => {
    const query = 'INSERT INTO machine(  name, qteoxy ,description, iduser , STATUT) VALUES (  ? , ? , ?, ? , ? )';

    database.query(query, args, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                resolve(false);
            } else {
                throw err;
            }
        } else {
            const isValidCreation = (result['affectedRows'] == 1);
            resolve(isValidCreation);
        }
    });
});


exports.createOnemachine = (toUser) => new Promise((resolve, reject) => {
    const args = [
        name,
        qteoxy,
        description,
        toUser,
        "False"
    ];
    this.createMachine(args).then(state => resolve(state));
});


exports.deleteOnemachine = args => new Promise((resolve, reject) => {
    const query = "DELETE FROM machine WHERE idmachine = ? ";
    database.query(query, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] > 0) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});



exports.updateNameMachine = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE machine SET name = ? WHERE idmachine = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});


exports.updateQteMachine = args => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE machine SET qteoxy = ? WHERE idmachine = ?';

    database.query(updateQuery, args, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] == 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
});


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