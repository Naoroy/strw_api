const mysql = require('mysql')

const db_connection = mysql.createConnection({
  host: 'localhost',
  database: 'heroku_1c14da866ac803a',
  user: 'b08feda83cf450',
  password: 'cb911d7a'
})

module.exports = db_connection
