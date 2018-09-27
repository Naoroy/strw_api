const db_connection = require('./db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = { secret: process.env.secretKey }

const createToken = (user) => {
  return jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })
}
const findUser = (mail, callback) => {
  user.get(mail, (error, result) => {
    callback({ password: result.user.password })
  })
}

const user = {
  get(mail, callback) {
    const sql = `SELECT * FROM user WHERE mail = "${ mail }"`
    db_connection.query(sql, (error, result) => {
      if (error) throw error
      callback(null, { user: result[0] })
    })
  },
  // get(callback) {
  //   const sql = 'SELECT * FROM users'
  //
  //   db_connection.query(sql, (error, result) => {
  //     if (error) { throw error }
  //     console.log(result);
  //     // callback(result)
  //   })
  // },
  post(user, callback) {
    const { name, mail, password } = user
    var hashedPassword = bcrypt.hashSync(password, 8);
    const sql = `INSERT INTO user (name, mail, password)
    VALUES ("${ name }", "${ mail }", "${ hashedPassword }")`
    db_connection.query(sql, (error, result) => {
      if (error) {
        if (error.errno === 1062) {
          return callback(error.errno, error.sqlMessage)
        }
        else { throw error }
      }
      callback(null, { mail, password })
    })
  },
  login(login, callback) {
    findUser(login.mail, (user) => {
      if (!user ) return callback('errrrr', 'user ain\'t there')
      const passwordIsValid = bcrypt.compareSync(login.password, user.password)
      if (!passwordIsValid) return callback('errrrr', 'wrong pwd')
      callback(null, createToken(user))
    })
  },
  del() {}
}

module.exports = user
