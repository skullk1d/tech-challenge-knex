const express = require('express')
const morgan = require('morgan')

const knex = require('./knex')

const getKnowledgeCheckBlocks = (req, res) =>
  knex('knowledgeCheckBlocks')
    .then(res.send.bind(res))

function server() {
  const app = express()
  const port = 3000

  app.use(morgan('dev'))

  app.get('/knowledge-check-blocks', getKnowledgeCheckBlocks)

  app.start = app.listen.bind(app, port, () => console.log(`Listening on port ${port}`))

  return app
}

if (require.main === module) server().start()

module.exports = server
