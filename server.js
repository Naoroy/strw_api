const express = require('express')
const routes = require('./router')
const PORT = process.env.PORT || 5000

express()
  .use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }
    next()
  })
  .use(express.json())
  .use(routes)
  .listen(PORT, () => {
    console.log(`Listening on ${ PORT }`)
    if (process.env.NODE_ENV === 'development') {
      console.log('CORS Allowed!')
    }
  })
