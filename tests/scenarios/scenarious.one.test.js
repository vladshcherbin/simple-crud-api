import crypto from 'crypto'
// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals'
import request from 'supertest'

const sampleUUID = 'a59ef8b2-a97d-4b17-b31d-2d56fe9d2320'
const mockedRandomUUID = jest.fn(() => crypto.randomUUID())

jest.unstable_mockModule('crypto', () => ({
  default: { ...crypto, randomUUID: mockedRandomUUID }
}))

jest.unstable_mockModule('../../src/data/persons', () => ({
  default: []
}))

const { default: server } = await import('../../src/server')

describe.only('Scenario one', () => {
  test('Return empty person list', async () => {
    const response = await request(server.instance()).get('/person')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Create and return created person', async () => {
    mockedRandomUUID.mockReturnValueOnce(sampleUUID)

    const response = await request(server.instance()).post('/person').send({
      name: 'Bob',
      age: 25,
      hobbies: ['hiking']
    })

    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Return created person by id', async () => {
    const response = await request(server.instance()).get(`/person/${sampleUUID}`)

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Update created person and return updated person', async () => {
    const response = await request(server.instance()).put(`/person/${sampleUUID}`).send({
      name: 'Sam',
      age: 25,
      hobbies: ['singing']
    })

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Delete created person', async () => {
    const response = await request(server.instance()).delete(`/person/${sampleUUID}`)

    expect(response.status).toBe(204)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })

  test('Return 404 error for deleted person', async () => {
    const response = await request(server.instance()).get(`/person/${sampleUUID}`)

    expect(response.status).toBe(404)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchSnapshot()
  })
})
