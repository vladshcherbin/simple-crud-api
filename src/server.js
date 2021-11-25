import { createServer } from 'http'
import persons from './data/persons'

const server = createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(persons))
})

export default server
