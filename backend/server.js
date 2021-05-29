const http = require('http')
const app = require('./app')

const logger = require('./utils/logger')
const port = require('./utils/config').PORT

const server = http.createServer(app)

server.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})