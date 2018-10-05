
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dbConnection = require('./db')
const findUser = require('./find-user')

const config = { secret: process.env.secretKey }

const createToken = user => jwt.sign({ id: user.id },
  config.secret,
  { expiresIn: 86400 }) // expires in 24 hours

const user = {
  get(mail, callback) {
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
  },
  post(userData, callback) {
    const { name, mail, password } = userData
    const hashedPassword = bcrypt.hashSync(password, 8)
    const sql = `INSERT INTO user (name, mail, password)
    VALUES ("${name}", "${mail}", "${hashedPassword}")`
    dbConnection.query(sql, (error) => {
      if (error) { return callback(error, 'This mail is already taken') }
      return callback(null, { mail, password })
    })
  },
  login(login, callback) {
    findUser(login.mail, (error, result) => {
      if (error) return callback(error, result)
      const pwdIsValid = bcrypt.compareSync(login.password, result.password)
      if (!pwdIsValid) {
        return callback('error', 'Password is not valid')
      }
      return callback(null, createToken(result.password))
    })
  },
  del() {},
}

module.exports = user
