import crypto from 'crypto'
// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals'
import request from 'supertest'

const samplePersons = [
  {
    id: 'b73a288b-7a09-4fa6-b988-2b14235e1e95',
    name: 'Susan',
    age: 41,
    hobbies: ['dancing', 'hiking']
  }
]
const sampleUUID = 'a59ef8b2-a97d-4b17-b31d-2d56fe9d2320'
const firstPersonId = samplePersons[0].id
const mockedRandomUUID = jest.fn(() => crypto.randomUUID())

jest.unstable_mockModule('crypto', () => ({
  default: { ...crypto, randomUUID: mockedRandomUUID }
}))

jest.unstable_mockModule('../../src/data/persons', () => ({
  default: samplePersons
}))

const { default: server } = await import('../../src/server')

describe('Scenario three', () => {
  test('Return person list with 1 persons', async () => {
    const response = await request(server.instance()).get('/person')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Delete person', async () => {
    const response = await request(server.instance()).delete(`/person/${firstPersonId}`)

    expect(response.status).toBe(204)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Return 404 trying to delete deleted person', async () => {
    const response = await request(server.instance()).delete(`/person/${firstPersonId}`)

    expect(response.status).toBe(404)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Return 404 trying to update deleted person', async () => {
    const response = await request(server.instance()).put(`/person/${firstPersonId}`).send({
      name: 'Susan',
      age: 42,
      hobbies: ['dancing', 'hiking']
    })

    expect(response.status).toBe(404)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Create and return created person', async () => {
    mockedRandomUUID.mockReturnValueOnce(sampleUUID)

    const response = await request(server.instance()).post('/person').send({
      name: 'Susan',
      age: 42,
      hobbies: ['dancing', 'hiking']
    })

    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Return person list with 1 person', async () => {
    const response = await request(server.instance()).get('/person')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })
})
