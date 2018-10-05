const express = require('express')
const item = require('./src/methods/item')
const user = require('./src/methods/user')
const verifyToken = require('./src/methods/verify-token')
const verifyUser = require('./src/methods/verify-user')

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json('OK')
  res.end()
})
  .get('/auth', verifyToken, (req, res) => {
    res.status(200).json('OK')
    res.end()
  })
  .get('/user', (req, res) => {
    res.status(200).json('OK')
    res.end()
  })
  .post('/user', verifyUser, (req, res) => {
    user.post(req.body, (error, result) => {
      if (error) {
        res.status(422).json({ errorMsg: result }).end()
      } else {
        user.login(result, (err, token) => {
          res.status(200).json({
            msg: 'User was succesfully created',
            auth: true,
            token,
          }).end()
        })
      }
    })
  })
  .post('/login', (req, res) => {
    user.login(req.body, (error, result) => {
      if (error) {
        res.status(200).json({ auth: false, error: result }).end()
      } else {
        res.status(200).json({ auth: true, token: result }).end()
      }
    })
  })
  .get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null }).end()
  })
  .get('/items', (req, res) => {
    item.get((result) => {
      res.status(200).json(result)
      res.end()
    })
  })
  .post('/items', (req, res) => {
    item.post(req.body, () => {
      res.status(200).json('OK')
      res.end()
    })
  })
  .patch('/items/:id', (req, res) => {
    item.patch(req.body, req.params.id, () => {
      res.status(200).json(`item: ${req.params.id} has been updated`)
      res.end()
    })
  })
  .delete('/items/:id', (req, res) => {
    item.del(req.params.id, () => {
      res.status(200).json(`item: ${req.params.id} has been removed`)
      res.end()
    })
  })

module.exports = router
