import { STATUS_CODES } from 'http'

class ClientError extends Error {
  constructor(message, status = 400, ...parameters) {
    super(message, ...parameters)

    this.name = 'ClientError'
    this.status = status
    this.message = message || STATUS_CODES[status] || status
  }
}

export default ClientError
