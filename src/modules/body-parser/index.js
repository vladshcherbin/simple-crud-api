import { ClientError } from '../errors'

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''

    request
      .on('data', (chunk) => {
        body += chunk
      })
      .on('end', () => {
        resolve(body)
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

export default async function parseBody(request) {
  try {
    const body = await readRequestBody(request)

    return body ? JSON.parse(body) : {}
  } catch (error) {
    throw new ClientError()
  }
}
