import { randomInt, randomUUID } from 'crypto'

function generateName() {
  const names = ['Alex', 'Sam', 'Susan', 'Bob', 'James', 'Sarah']

  return names[randomInt(names.length - 1)]
}

function generateAge() {
  return randomInt(6, 60)
}

function generateHobbies() {
  const hobbies = ['tennis', 'console gaming', 'singing', 'dancing', 'hiking']

  return Array.from({ length: randomInt(3) }, () => (
    hobbies[randomInt(hobbies.length - 1)]
  ))
}

export default Array.from({ length: randomInt(2, 4) }, () => ({
  id: randomUUID(),
  name: generateName(),
  age: generateAge(),
  hobbies: generateHobbies()
}))
