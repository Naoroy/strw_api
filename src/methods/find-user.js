const dbConnection = require('./db')

const getUser = (mail, callback) => {
  const sql = `SELECT * FROM user WHERE mail = "${mail}"`
  dbConnection.query(sql, (error, result) => {
    if (error || !result.length) {
      return callback(true, {
        error,
        msg: 'user not found',
      })
    }
    return callback(null, result[0])
  })
}
module.exports = (mail, callback) => {
  getUser(mail, (error, result) => {
    if (error) return callback(error, result)
    return callback(null, { mail: result.mail, password: result.password })
  })
}
