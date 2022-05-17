const mysql = require('mysql');
const util = require ('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b3dc8fd3c7e909',
    password: '3874b4ea',
    database: 'heroku_9f8c839918442c4'
});

pool.query = util.promisify(pool.query);
module.exports = pool;