// db/connection.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    Port: '5432',
    user: 'postgres',
    password: 'admin',
    database: 'test',
});

module.exports = connection;