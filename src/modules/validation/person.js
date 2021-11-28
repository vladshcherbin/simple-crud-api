import ValidationError from './ValidationError'
import { isNumber, isString, transformData } from './utilities'

function checkAge(age) {
  if (!age) {
    return '"age" value is missing'
  }

  if (!isNumber(age)) {
    return '"age" must be a number'
  }

  if (!Number.isInteger(age)) {
    return '"age" must be an integer value'
  }

  if (age > 120) {
    return '"age" must be less than 120'
  }

  return null
}

function checkHobbies(hobbies) {
  if (!hobbies) {
    return '"hobbies" value is missing'
  }

  if (!Array.isArray(hobbies)) {
    return '"hobbies" must be an array'
  }

  if (hobbies.filter((hobby) => !isString(hobby)).length !== 0) {
    return '"hobbies" values must be strings'
  }

  if (hobbies.filter((hobby) => hobby.length < 3).length !== 0) {
    return '"hobbies" values must be at least 3 characters'
  }

  return null
}

function checkName(name) {
  if (!name) {
    return '"name" value is missing'
  }

  if (!isString(name)) {
    return '"name" must be a string'
  }

  if (name.length < 2) {
    return '"name" must be at least 2 characters'
  }

  return null
}

export default function validatePerson(data) {
  const transformedData = transformData(data, ['name', 'age', 'hobbies'])
  const { age, hobbies, name } = transformedData
  const errors = {}
  const ageError = checkAge(age)
  const nameError = checkName(name)
  const hobbiesError = checkHobbies(hobbies)

  if (ageError) {
    errors.age = ageError
  }

  if (nameError) {
    errors.name = nameError
  }

  if (hobbiesError) {
    errors.hobbies = hobbiesError
  }

  if (Object.keys(errors).length) {
    throw new ValidationError(errors)
  }

  return transformedData
}
