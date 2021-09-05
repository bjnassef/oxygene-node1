const MYSQL_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER NOT NULL AUTO_INCREMENT, 
    name TEXT NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    address VARCHAR(50),
    X INTEGER,
    Y INTEGER,
    PRIMARY KEY(id),
    UNIQUE(email, username))`;

    const MYSQL_Machine_TABLE = `CREATE TABLE IF NOT EXISTS machine(
        idmachine INTEGER NOT NULL AUTO_INCREMENT,
        NAME VARCHAR(50) NOT NULL,
        qteoxy INTEGER NOT NULL,
        description TEXT,
        iduser INTEGER NOT NULL REFERENCES users(id),
        STATUS BOOLEAN DEFAULT false ,
            PRIMARY KEY(idmachine)
    ) `;

const MYSQL_Client_TABLE = `CREATE TABLE IF NOT EXISTS CLIENT(
    CIN INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    Adress TEXT NOT NULL,
    phone VARCHAR(9),
    idmachine INTEGER REFERENCES machine(idmachine),
    PRIMARY KEY(CIN))`;
  
   
exports.MYSQL_USERS_TABLE = MYSQL_USERS_TABLE;
exports.MYSQL_Machine_TABLE = MYSQL_Machine_TABLE;
exports.MYSQL_Client_TABLE = MYSQL_Client_TABLE;

