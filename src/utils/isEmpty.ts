/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

const isSymbol = (value: any): value is symbol =>
  !!value && value.constructor === Symbol

const isFunction = (value: any): value is Function =>
  !!(value?.constructor && value.call && value.apply)

const isDate = (value: any): value is Date =>
  Object.prototype.toString.call(value) === '[object Date]'

const isNumber = (value: any): value is number => {
  try {
    return Number(value) === value
  } catch {
    return false
  }
}

export function isEmpty(value: any) {
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true
  if (Number(value)) return value === 0
  if (isDate(value)) return Number.isNaN(value.getTime())
  if (isFunction(value)) return false
  if (isSymbol(value)) return false
  const { length } = value
  if (isNumber(length)) return length === 0
  const { size } = value
  if (isNumber(size)) return size === 0
  const keys = Object.keys(value).length
  return keys === 0
}
