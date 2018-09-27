const express = require('express')
// const routes = require('./router')
const PORT = process.env.PORT || 5000

express()
  .use(express.json())
  // .use(routes)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
