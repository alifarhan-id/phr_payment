const mysql = require('mysql2');
const dbConfig = require("../config/config")

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(error => {
    if(error) 
        throw error;
    console.log("koneksi berhasil");
});

module.exports = connection;