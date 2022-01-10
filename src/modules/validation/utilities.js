export function isString(value) {
  return typeof value === 'string'
}

export function isNumber(value) {
  return typeof value === 'number' && (value - value === 0)
}

export function transformData(data, validFields) {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([field]) => validFields.includes(field))
      .map(([field, value]) => (isString(value) ? [field, value.trim()] : [field, value]))
  )
}
