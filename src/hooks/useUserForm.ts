import { useMemo, useState } from 'react'
import type { ChangeEvent, FocusEvent } from 'react'
import type { UserFormValues } from '../types/user'
import type { UserValidationErrors } from '../types/userValidation'

type UseUserFormArgs = {
  initialValues: UserFormValues
  validate: (values: UserFormValues) => UserValidationErrors
}

export function useUserForm({ initialValues, validate }: UseUserFormArgs) {
  const [values, setValues] = useState<UserFormValues>(initialValues)
  const [errors, setErrors] = useState<UserValidationErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof UserFormValues, boolean>>>({})

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors])

  function setField(field: keyof UserFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value } as UserFormValues))
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const { name } = e.target
    const field = name as keyof UserFormValues
    setTouched((prev) => ({ ...prev, [field]: true }))

    setErrors(validate({ ...values, [field]: values[field] }))
  }

  function validateAll() {
    const next = validate(values)
    setErrors(next)
    setTouched({
      name: true,
      email: true,
      phone: true,
      city: true,
    })
    return Object.keys(next).length === 0
  }

  function reset(nextValues: UserFormValues = initialValues) {
    setValues(nextValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    isValid,
    setField,
    setValues,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  }
}

