import crypto from 'crypto'
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
const secondPersonId = samplePersons[1].id
const mockedRandomUUID = jest.fn(() => crypto.randomUUID())

jest.unstable_mockModule('crypto', () => ({
  default: { ...crypto, randomUUID: mockedRandomUUID }
}))

jest.unstable_mockModule('../../src/data/persons', () => ({
  default: samplePersons
}))

const { default: server } = await import('../../src/server')

describe('Scenario two', () => {
  test('Return person list with 3 persons', async () => {
    const response = await request(server.instance()).get('/person')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Delete second person', async () => {
    const response = await request(server.instance()).delete(`/person/${secondPersonId}`)

    expect(response.status).toBe(204)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Return 404 error for deleted person', async () => {
    const response = await request(server.instance()).get(`/person/${secondPersonId}`)

    expect(response.status).toBe(404)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Return 400 trying to update first person with invalid data', async () => {
    const response = await request(server.instance()).put(`/person/${samplePersons[0].id}`).send({
      age: 19
    })

    expect(response.status).toBe(400)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Update first person with valid data', async () => {
    const response = await request(server.instance()).put(`/person/${samplePersons[0].id}`).send({
      name: 'Alex',
      age: 19,
      hobbies: ['tennis']
    })

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Return person list with 2 persons', async () => {
    const response = await request(server.instance()).get('/person')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })
})
