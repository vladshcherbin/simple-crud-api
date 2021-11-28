import http, { STATUS_CODES } from 'http'
import parseBody from '../body-parser'
import { ClientError, NotFoundError } from '../errors'
import pathToRegex from '../path-to-regex'
import { ValidationError } from '../validation'

export default function createServer() {
  const routes = []
  const server = http.createServer(async (request, response) => {
    response.setHeader('Content-Type', 'application/json')

    try {
      const { pathname } = new URL(request.url, 'http://127.0.0.1')
      const matchedRoute = [...routes].reverse().find(({ method, regex }) => (
        request.method === method && regex.test(pathname)
      ))

      if (matchedRoute) {
        request.params = matchedRoute.regex.exec(pathname).groups || {}
        request.body = await parseBody(request)
        response.send = (data) => {
          response.end(JSON.stringify(data))
        }

        matchedRoute.handler(request, response)
      } else {
        response.statusCode = 404
        response.end(JSON.stringify({ message: STATUS_CODES[response.statusCode] }))
      }
    } catch (error) {
      if (error instanceof ClientError) {
        response.statusCode = error.status
        response.end(JSON.stringify({ message: error.message }))
      } else if (error instanceof ValidationError) {
        response.statusCode = error.status
        response.end(JSON.stringify({ message: error.message, errors: error.errors }))
      } else if (error instanceof NotFoundError) {
        response.statusCode = 404
        response.end(JSON.stringify({ message: error.message }))
      } else {
        response.statusCode = 500
        response.end(JSON.stringify({ message: STATUS_CODES[response.statusCode] }))
      }
    }
  })

  return {
    get: (path, handler) => {
      routes.push({ method: 'GET', regex: pathToRegex(path), handler })
    },
    post: (path, handler) => {
      routes.push({ method: 'POST', regex: pathToRegex(path), handler })
    },
    put: (path, handler) => {
      routes.push({ method: 'PUT', regex: pathToRegex(path), handler })
    },
    delete: (path, handler) => {
      routes.push({ method: 'DELETE', regex: pathToRegex(path), handler })
    },
    instance() {
      return server
    },
    listen: (...args) => (
      server.listen(...args)
    )
  }
}
