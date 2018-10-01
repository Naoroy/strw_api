const mysql = require('mysql')

const connectToDB = () => {
  const currentEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
  if (currentEnv === 'development') {
    console.log('dev environement: connected to db \'test_strw\' as \'nana\'')
    return db_connection = mysql.createConnection({
      host: 'localhost',
      database: 'test_strw',
      user: 'nana',
      password: ''
    })
  }
  return mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    database: 'heroku_1c14da866ac803a',
    user: 'b08feda83cf450',
    password: 'cb911d7a'
  })

}

module.exports = connectToDB()
