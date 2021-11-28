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
const sampleUUID = 'a59ef8b2-a97d-4b17-b31d-2d56fe9d2320'
const mockedRandomUUID = jest.fn(() => crypto.randomUUID())

jest.unstable_mockModule('crypto', () => ({
  default: { ...crypto, randomUUID: mockedRandomUUID }
}))

jest.unstable_mockModule('../src/data/persons', () => ({
  default: samplePersons
}))

const { default: server } = await import('../src/server')

describe('POST /person', () => {
  test('Create and return created person', async () => {
    mockedRandomUUID.mockReturnValueOnce(sampleUUID)

    const createPersonRequest = await request(server.instance()).post('/person').send({
      name: 'Bob',
      age: 25,
      hobbies: ['console gaming']
    })
    const personRequest = await request(server.instance()).get('/person')

    expect(createPersonRequest.status).toBe(201)
    expect(createPersonRequest.type).toBe('application/json')
    expect(createPersonRequest.body).toMatchSnapshot()
    expect(personRequest.body).toMatchSnapshot()
  })

  test('Return 400 error when request data is invalid', async () => {
    const response = await request(server.instance()).post('/person').send({
      name: '',
      age: 25
    })

    expect(response.status).toBe(400)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })
})
