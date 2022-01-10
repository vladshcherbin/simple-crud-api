class ValidationError extends Error {
  constructor(errors, ...parameters) {
    super(...parameters)

    this.name = 'ValidationError'
    this.message = 'Validation error'
    this.errors = errors
  }
}

export default ValidationError
