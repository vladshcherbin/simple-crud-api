import { ClientError } from '../errors'

function isValidUUID(uuid) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)
}

export default function checkUUID(uuid) {
  if (!isValidUUID(uuid)) {
    throw new ClientError('Invalid id value format')
  }
}
