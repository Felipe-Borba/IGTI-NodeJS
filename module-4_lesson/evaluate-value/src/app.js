const express = require('express')
const app = express()

app.use('/', async (req, res) => {
  res.send('hello world')
})

module.exports = app
