import crypto from 'crypto'
import persons from '../data/persons'
import { NotFoundError } from '../modules/errors'

export function all() {
  return persons
}

export function findById(id) {
  const foundPerson = persons.find((person) => person.id === id)

  if (!foundPerson) {
    throw new NotFoundError('Person not found')
  }

  return foundPerson
}

export function create(data) {
  const person = {
    id: crypto.randomUUID(),
    ...data
  }

  persons.push(person)

  return person
}

export function update(id, data) {
  const foundPerson = persons.find((person) => person.id === id)

  if (!foundPerson) {
    throw new NotFoundError('Person not found')
  }

  const foundPersonIndex = persons.findIndex((person) => person.id === id)
  const updatedPerson = { ...foundPerson, ...data }

  persons.fill(updatedPerson, foundPersonIndex, foundPersonIndex + 1)

  return updatedPerson
}

export function remove(id) {
  const foundPerson = persons.find((person) => person.id === id)

  if (!foundPerson) {
    throw new NotFoundError('Person not found')
  }

  const foundPersonIndex = persons.findIndex((person) => person.id === id)

  persons.splice(foundPersonIndex, foundPersonIndex + 1)

  return foundPerson
}
