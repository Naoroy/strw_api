const jwt = require('jsonwebtoken');
const config = { secret: process.env.secretKey }


module.exports = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' })
  }
  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token.'
      })
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.iat;
    next()
  })
}
// module.exports = verifyToken
