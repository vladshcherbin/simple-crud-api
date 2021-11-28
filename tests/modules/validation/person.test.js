import { ValidationError, validatePerson } from '../../../src/modules/validation'

describe('Age value', () => {
  test('Return error when age is missing', () => {
    expect(() => { validatePerson({ name: 'Sam', hobbies: [] }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { age: '"age" value is missing' }
    }))
  })

  test('Return error when age is not a number', () => {
    expect(() => { validatePerson({ name: 'Sam', age: '19', hobbies: [] }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { age: '"age" must be a number' }
    }))
  })

  test('Return error when age is not an integer', () => {
    expect(() => { validatePerson({ name: 'Sam', age: 19.1, hobbies: [] }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { age: '"age" must be an integer value' }
    }))
  })

  test('Return error when age is more than 120', () => {
    expect(() => { validatePerson({ name: 'Sam', age: 121, hobbies: [] }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { age: '"age" must be less than 120' }
    }))
  })

  test('Return no error when value is valid', () => {
    expect(() => { validatePerson({ name: 'Sam', age: 19, hobbies: [] }) }).not.toThrow()
  })
})

describe('Hobbies value', () => {
  test('Return error when hobbies is missing', () => {
    expect(() => { validatePerson({ name: 'Sam', age: 19 }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { hobbies: '"hobbies" value is missing' }
    }))
  })

  test('Return error when hobbies is not an array', () => {
    expect(() => { validatePerson({ name: 'Sam', age: 19, hobbies: 'hiking' }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { hobbies: '"hobbies" must be an array' }
    }))
  })

  test('Return error when hobbies contains non string values', () => {
    expect(() => { validatePerson({ name: 'Sam', age: 19, hobbies: [1, 'hiking'] }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { hobbies: '"hobbies" values must be strings' }
    }))
  })

  test('Return error when hobbies contains values less than 3 characters', () => {
    expect(() => { validatePerson({ name: 'Sam', age: 19, hobbies: ['yo'] }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { hobbies: '"hobbies" values must be at least 3 characters' }
    }))
  })

  test('Return no error when value is valid', () => {
    expect(() => { validatePerson({ name: 'Sam', age: 19, hobbies: ['dancing', 'hiking'] }) }).not.toThrow()
  })
})

describe('Name value', () => {
  test('Return error when name is missing', () => {
    expect(() => { validatePerson({ age: 19, hobbies: [] }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { name: '"name" value is missing' }
    }))
  })

  test('Return error when name is not a string', () => {
    expect(() => { validatePerson({ name: 1, age: 19, hobbies: ['hiking'] }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { name: '"name" must be a string' }
    }))
  })

  test('Return error when name is less than 2 characters', () => {
    expect(() => { validatePerson({ name: 'S', age: 19, hobbies: [] }) }).toThrow(expect.objectContaining({
      name: 'ValidationError',
      message: 'Validation error',
      errors: { name: '"name" must be at least 2 characters' }
    }))
  })

  test('Return no error when value is valid', () => {
    expect(() => { validatePerson({ name: 'Sam', age: 19, hobbies: [] }) }).not.toThrow()
  })
})
