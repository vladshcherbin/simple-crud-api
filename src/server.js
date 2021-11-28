import createServer from './modules/server'
import checkUUID from './modules/uuid'
import * as person from './repositories/person'

const server = createServer()

server.get('/person', (_, response) => {
  response.send(person.all())
})

server.get('/person/:id', (request, response) => {
  checkUUID(request.params.id)

  response.send(person.findById(request.params.id))
})

server.post('/person', (request, response) => {
  response.send(person.create(request.body))
})

server.put('/person/:id', (request, response) => {
  checkUUID(request.params.id)

  response.send(person.update(request.params.id, request.body))
})

server.delete('/person/:id', (request, response) => {
  checkUUID(request.params.id)

  const removedPerson = person.remove(request.params.id)

  response.statusCode = 204
  response.send(removedPerson)
})

export default server
