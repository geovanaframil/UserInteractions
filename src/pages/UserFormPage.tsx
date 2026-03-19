import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../components/ui/Spinner'
import { FormError } from '../components/ui/FormError'
import { UserForm } from '../components/users/UserForm'
import { useUsersContext } from '../contexts/useUsersContext'
import type { UserFormValues } from '../types/user'
import { usersApi } from '../services/users/usersApi'
import { formatBrazilPhone } from '../utils/phone'

const emptyValues: UserFormValues = {
  name: '',
  email: '',
  phone: '',
  city: '',
}

export function UserFormPage() {
  const navigate = useNavigate()
  const { refresh } = useUsersContext()
  const params = useParams()

  const userId = useMemo(() => {
    const raw = params.id
    if (!raw) return null
    const n = Number(raw)
    if (!Number.isFinite(n) || n <= 0) return null
    return n
  }, [params.id])

  const [initialValues, setInitialValues] = useState<UserFormValues>(emptyValues)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      if (!userId) return

      setLoading(true)
      setError(null)
      try {
        const user = await usersApi.fetchUserById(userId)
        setInitialValues({
          name: user.name,
          email: user.email,
          phone: formatBrazilPhone(user.phone),
          city: user.city,
        })
      } catch (err) {
        setError(usersApi.getAxiosErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [userId])

  async function handleSubmit(values: UserFormValues) {
    const successMessage = userId ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!'

    if (userId) await usersApi.updateUser(userId, values)
    else await usersApi.createUser(values)

    await refresh()
    navigate('/users', {
      state: {
        successToast: successMessage,
      },
    })
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/40">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <FormError message={error} />
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-100">
          {userId ? 'Editar usuário' : 'Cadastrar usuário'}
        </h2>
        <p className="text-sm text-slate-400">
          Preencha os campos com atenção. Todos os campos são obrigatórios.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40 sm:p-6">
        <UserForm
          key={userId ?? 'create'}
          initialValues={initialValues}
          submitLabel={userId ? 'Salvar alterações' : 'Cadastrar'}
          onCancel={() => navigate('/users')}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

