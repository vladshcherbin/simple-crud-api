import { jest } from '@jest/globals'
import request from 'supertest'

jest.unstable_mockModule('../src/data/persons', () => ({
  default: [
    {
      id: '02d2de0d-28f6-4d9a-b2cd-d9725b8d16c1',
      name: 'Alex',
      age: 18,
      hobbies: ['tennis']
    },
    {
      id: '75bae368-133e-4896-9655-19ddf027ad14',
      name: 'Sam',
      age: 6,
      hobbies: []
    },
    {
      id: 'b73a288b-7a09-4fa6-b988-2b14235e1e95',
      name: 'Susan',
      age: 41,
      hobbies: ['dancing', 'hiking']
    }
  ]
}))

const { default: server } = await import('../src/server')

test('Return persons list', async () => {
  const response = await request(server).get('/')

  expect(response.status).toBe(200)
  expect(response.type).toBe('application/json')
  expect(response.body).toMatchSnapshot()
})