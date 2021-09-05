const database = require('../../database/config');
var app= require('express')();


exports.createNewClient = args => new Promise((resolve, reject) => {
    const query = `INSERT INTO client (CIN, name, Lastname, adress, phone, idmachine) VALUES ( ?, ?, ?, ?, ?, ?)`;
    database.query(query, args, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                resolve([false]);
            } else {
                throw err;
            }
        } else {
            const isValidRequest = result['affectedRows'] == 1;
            resolve([isValidRequest, result.insertId]);
        }
    });
});



exports.getMachinebyCIN = args => new Promise((resolve, reject) => {
    const query = `SELECT DISTINCT idmachine
                                   FROM client WHERE CIN = ? LIMIT ? OFFSET ?`;

    database.query(query, args, (err, result) => {
        if (err) throw err;
        resolve(result);
    });
});


    exports.getOneClient = args => new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT  
         client.Name,
         client.Lastname,
         client.Adress,
         client.idmachine
         FROM client  WHERE CIN = ?`;
        database.query(query, args, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });


    
    exports.getClientByMachine = args => new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT  
        client.CIN 
        client.Name,
         client.Lastname,
         client.Adress,
         FROM client  WHERE idmachine = ?`;
        database.query(query, args, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });