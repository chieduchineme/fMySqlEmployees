const mongoose = require('mongoose');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

export const getEstMongoDbConnection = async() => {
    const conn = mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
    return conn
}

export var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'EmployeeDB'
})
  
export const ourMySqlConnection = async() => {
    mysqlConnection.connect((err) => {
        if (!err){
        console.log("DB Connected")
        } else{
        console.log("DB connection failed:" + JSON.stringify(err, undefined, 2));
        }
    });
}

