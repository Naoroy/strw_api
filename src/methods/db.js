const mysql = require('mysql')

const db_connection = mysql.createConnection({
  host: 'localhost',
  database: 'test_strw',
  user: 'nana',
  password: ''
})

module.exports = db_connection
