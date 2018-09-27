const mysql = require('mysql')

const db_connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  database: 'heroku_1c14da866ac803a',
  user: 'b08feda83cf450',
  password: 'cb911d7a'
})

module.exports = db_connection
