require('dotenv').config()
const path = require('path')
const sessionInitializer = require('./sessionInitializer')
const loginHandler = require('./auth/loginHandler')
const userApi = require('./user/userApi')
const authenticator = require('./auth/authenticator')
const headerMiddleware = require('./headerMiddleware')
const runMigrations = require('./migration/migrationRunner')

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const app = express()

runMigrations()

headerMiddleware.init(app)
sessionInitializer.init(app)
authenticator.init(app)
loginHandler.init(app)
userApi.init(app)

app.use(compression({threshold: 512}))

const clientAppHtml = (req, res) => res.sendFile(path.resolve(`${__dirname}/../dist/index.html`))
app.use('/view1*', clientAppHtml)
app.use('/view2*', clientAppHtml)
app.use('/', express.static(`${__dirname}/../dist`))

app.use('/img/', express.static(`${__dirname}/../web-resources/img`))
app.use('/css/', express.static(`${__dirname}/../web-resources/css`))
app.use(bodyParser.json({limit: '5000kb'}))


app.listen(process.env.PORT, () => {
  console.log('server listening on port ', process.env.PORT)
})
