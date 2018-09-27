const express = require('express')
const router = express.Router()
const user = require('./src/methods/user')
const item = require('./src/methods/item')
const verifyToken = require('./src/methods/verify-token')

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
  .post('/user', (req, res) => {
    user.post(req.body, (error, login) => {
      if (error) {
        return res.status(422).json(error).end()
      }
      user.login(login, (error, token) => {
        res.status(200).json({ auth: true, token }).end()
      })
    })
  })
  .post('/login', (req, res) => {
    user.login(req.body, (error, token) => {
      res.status(200).json({ auth: true, token }).end()
    })
  })
  .get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null }).end();
  })
  .get('/items', (req, res) => {
    item.get((result) => {
      res.status(200).json(result)
      res.end()
    })
  })
  .post('/items', (req, res) => {
    item.post(req.body, (result) => {
      res.status(200).json('OK')
      res.end()
    })
  })
  .patch('/items/:id', (req, res) => {
    item.patch(req.body, req.params.id, (result) => {
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
