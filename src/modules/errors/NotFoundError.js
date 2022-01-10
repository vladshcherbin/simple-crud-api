class NotFoundError extends Error {
  constructor(message = 'Item not found', ...parameters) {
    super(message, ...parameters)

    this.name = 'NotFoundError'
    this.message = message
  }
}

export default NotFoundError
