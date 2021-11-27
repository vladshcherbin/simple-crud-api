import crypto from 'crypto'
// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals'
import request from 'supertest'

const mockedPersons = [
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

const mockedRandomUUID = jest.fn(() => crypto.randomUUID())
const sampleUUID = 'a59ef8b2-a97d-4b17-b31d-2d56fe9d2320'

jest.unstable_mockModule('crypto', () => ({
  default: {
    ...crypto,
    randomUUID: mockedRandomUUID
  }
}))

jest.unstable_mockModule('../src/data/persons', () => ({
  default: mockedPersons
}))

const { default: server } = await import('../src/server')

describe('Routes', () => {
  describe('GET /person', () => {
    test('Return persons list', async () => {
      const response = await request(server.instance()).get('/person')

      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toMatchSnapshot()
    })
  })

  describe('GET /person/:id', () => {
    test('Return person with matching id', async () => {
      const response = await request(server.instance()).get(`/person/${mockedPersons[1].id}`)

      expect(response.status).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toMatchSnapshot()
    })

    test('Return 404 error when no matching person', async () => {
      const response = await request(server.instance()).get(`/person/${sampleUUID}`)

      expect(response.status).toBe(404)
      expect(response.type).toBe('application/json')
      expect(response.body).toMatchSnapshot()
    })
  })

  describe('POST /person', () => {
    test('Create and return created person', async () => {
      mockedRandomUUID.mockReturnValueOnce(sampleUUID)

      const createPersonRequest = await request(server.instance()).post('/person').send({
        name: 'Bob',
        age: 25,
        hobbies: ['console gaming']
      })
      const personRequest = await request(server.instance()).get('/person')

      expect(createPersonRequest.status).toBe(200)
      expect(createPersonRequest.type).toBe('application/json')
      expect(createPersonRequest.body).toMatchSnapshot()
      expect(personRequest.body).toMatchSnapshot()
    })
  })
})
