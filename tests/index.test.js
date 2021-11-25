import request from 'supertest'
import server from '../src/server'

test('Return persons list', async () => {
  const response = await request(server).get('/')

  expect(response.status).toBe(200)
  expect(response.type).toBe('application/json')
  expect(response.body).toEqual(expect.any(Array))

  response.body.forEach((element) => {
    expect(element).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      age: expect.any(Number),
      hobbies: expect.any(Array)
    }))
  })
})
