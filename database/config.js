const mysql = require('mysql');
const schema = require('../database/schema');

const databaseConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'oxygene1',
};

const connection = mysql.createConnection(databaseConfig);

connection.connect(error => {
    if (error) throw error;

    console.debug("Open MySQL Connection");

    //Create users table
    connection.query(schema.MYSQL_USERS_TABLE, (err, res) => {
        if (err) throw err;
        console.log("Users Table Done");
    });
    

    //Create machine table
    connection.query(schema.MYSQL_Machine_TABLE, (err, res) => {
        if (err) throw err;
        console.log("Machine Table Done");
    });


    //Create client table
    connection.query(schema.MYSQL_Client_TABLE, (err, res) => {
        if (err) throw err;
        console.log("Client Table Done");
    });

});




module.exports = connection;