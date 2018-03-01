const express = require('express')
const next = require('next')
const { redirect, http2 } = require('certbot-express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

//@TODO replace certDir with your own
const domain = `test.i18ntech.com`
const certDir = `/etc/letsencrypt/live/${domain}/`

app.prepare()
  .then(() => {
    const server = express()
    server.use(redirect)
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    http2({
      app: server,
      certDir,
    }).listen().then(() => {
      console.log(`server started, visit http://${domain} to test http2!`)
    }).catch((err) => {
      console.log(err)
    })
  })