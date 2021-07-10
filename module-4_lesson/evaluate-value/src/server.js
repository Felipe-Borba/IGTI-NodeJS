const app = require('./app')
const db = require('./db')

db.sequelize.sync().then(() => {
  console.log('Connected in database')
})

app.listen(8080, () => {
  console.log('server up on: http://localhost:8080')
})
