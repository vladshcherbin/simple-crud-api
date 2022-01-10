import request from 'supertest'
import server from '../src/server'

test('Return 404 when no matching endpoint', async () => {
  const response = await request(server.instance()).get('/some-non/existing/resource')

  expect(response.status).toBe(404)
  expect(response.type).toBe('application/json')
  expect(response.body).toMatchSnapshot()
})

test('Return 500 when route handler is missing', async () => {
  const response = await request(server.instance()).get('/missing-handler')

  expect(response.status).toBe(500)
  expect(response.type).toBe('application/json')
  expect(response.body).toMatchSnapshot()
})

test('Return 400 request body is invalid', async () => {
  const response = await request(server.instance()).post('/person').send('{')

  expect(response.status).toBe(400)
  expect(response.type).toBe('application/json')
  expect(response.body).toMatchSnapshot()
})
