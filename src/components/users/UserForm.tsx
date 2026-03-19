import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../ui/Button'
import { FormError } from '../ui/FormError'
import { TextField } from '../ui/TextField'
import { validateUser } from '../../types/userValidation'
import type { UserFormValues } from '../../types/user'
import { useUserForm } from '../../hooks/useUserForm'
import { usersApi } from '../../services/users/usersApi'
import { formatBrazilPhone } from '../../utils/phone'

export function UserForm({
  initialValues,
  submitLabel,
  onCancel,
  onSubmit,
}: {
  initialValues: UserFormValues
  submitLabel: string
  onCancel: () => void
  onSubmit: (values: UserFormValues) => Promise<void>
}) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useUserForm({
    initialValues,
    validate: validateUser,
  })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError(null)

    const ok = form.validateAll()
    if (!ok) return

    setSubmitting(true)
    try {
      await onSubmit(form.values)
    } catch (err) {
      setSubmitError(usersApi.getAxiosErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitError ? <FormError message={submitError} /> : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Nome"
          name="name"
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.name}
          placeholder="Ex: Maria Silva"
        />
        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={form.values.email}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.email}
          placeholder="voce@email.com"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Telefone"
          name="phone"
          value={form.values.phone}
          onChange={(event) => {
            const masked = formatBrazilPhone(event.target.value)
            form.setField('phone', masked)
          }}
          onBlur={form.handleBlur}
          error={form.errors.phone}
          placeholder="+55 (11) 99999-9999"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={19}
        />
        <TextField
          label="Cidade"
          name="city"
          value={form.values.city}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.city}
          placeholder="Ex: São Paulo"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Voltar
        </Button>

        <Button variant="primary" type="submit" isLoading={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

