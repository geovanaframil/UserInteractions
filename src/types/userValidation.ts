import type { UserFormValues } from './user'
import { isValidBrazilPhone } from '../utils/phone'

export type UserValidationErrors = Partial<Record<keyof UserFormValues, string>>

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateUser(values: UserFormValues): UserValidationErrors {
  const errors: UserValidationErrors = {}

  const name = values.name.trim()
  if (!name) errors.name = 'Nome é obrigatório.'
  else if (name.length < 2) errors.name = 'Nome deve ter pelo menos 2 caracteres.'

  const email = values.email.trim()
  if (!email) errors.email = 'E-mail é obrigatório.'
  else if (!emailRegex.test(email)) errors.email = 'E-mail inválido.'

  const phone = values.phone.trim()
  if (!phone) errors.phone = 'Telefone é obrigatório.'
  else if (!isValidBrazilPhone(phone))
    errors.phone = 'Use o formato +55 (xx) 9xxxx-xxxx.'

  const city = values.city.trim()
  if (!city) errors.city = 'Cidade é obrigatória.'
  else if (city.length < 2) errors.city = 'Cidade deve ter pelo menos 2 caracteres.'

  return errors
}

