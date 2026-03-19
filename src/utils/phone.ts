const PHONE_FULL_REGEX = /^\+55 \(\d{2}\) 9\d{4}-\d{4}$/

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatBrazilPhone(value: string): string {
  const digits = onlyDigits(value)
  if (!digits) return ''

  const withCountry = (digits.startsWith('55') ? digits : `55${digits}`).slice(0, 13)
  const ddd = withCountry.slice(2, 4)
  const firstPart = withCountry.slice(4, 9)
  const secondPart = withCountry.slice(9, 13)

  let masked = '+55'
  if (ddd.length > 0) masked += ` (${ddd}`
  if (ddd.length === 2) masked += ')'
  if (firstPart.length > 0) masked += ` ${firstPart}`
  if (secondPart.length > 0) masked += `-${secondPart}`

  return masked
}

export function isValidBrazilPhone(value: string): boolean {
  return PHONE_FULL_REGEX.test(value.trim())
}

