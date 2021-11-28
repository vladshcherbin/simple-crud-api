// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals'
import request from 'supertest'

const samplePersons = [
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
const sampleUUID = 'a59ef8b2-a97d-4b17-b31d-2d56fe9d2320'

jest.unstable_mockModule('../src/data/persons', () => ({
  default: samplePersons
}))

const { default: server } = await import('../src/server')

describe('DELETE /person/:id', () => {
  test('Delete person', async () => {
    const updatePersonRequest = await request(server.instance()).delete(`/person/${samplePersons[1].id}`)
    const personRequest = await request(server.instance()).get('/person')

    expect(updatePersonRequest.status).toBe(204)
    expect(updatePersonRequest.type).toBe('application/json')
    expect(updatePersonRequest.body).toMatchSnapshot()
    expect(personRequest.body).toMatchSnapshot()
  })

  test('Return 400 error when id is invalid', async () => {
    const response = await request(server.instance()).delete('/person/invalid-id')

    expect(response.status).toBe(400)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Return 404 error when no matching person', async () => {
    const response = await request(server.instance()).delete(`/person/${sampleUUID}`)

    expect(response.status).toBe(404)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })
})
