import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spinner } from '../components/ui/Spinner'
import { FormError } from '../components/ui/FormError'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { UsersTable } from '../components/users/UsersTable'
import { Button } from '../components/ui/Button'
import { useUsersContext } from '../contexts/useUsersContext'
import { toast } from 'react-hot-toast'

export function UsersListPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { users, loading, error, refresh, deleteUser } = useUsersContext()

  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  const pendingDeleteUser =
    deleteConfirmId != null ? users.find((u) => u.id === deleteConfirmId) : undefined

  useEffect(() => {
    const state = location.state as { successToast?: string } | null
    if (!state?.successToast) return

    toast.success(state.successToast, { id: 'user-form-success' })
    navigate(location.pathname, { replace: true, state: null })
  }, [location.pathname, location.state, navigate])

  async function executeDelete(id: number) {
    setDeleteError(null)
    setIsDeletingId(id)
    try {
      await deleteUser(id)
      toast.success('Usuário removido com sucesso!', { id: `user-delete-${id}` })
      setDeleteConfirmId(null)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao remover usuário.'
      setDeleteError(msg)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-slate-100">Usuários</h2>
          <p className="text-sm text-slate-400">Listagem e edição de usuários cadastrados.</p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          <Button
            variant="secondary"
            onClick={() => void refresh()}
            type="button"
            className="w-full sm:w-auto"
          >
            Recarregar
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/users/new')}
            type="button"
            className="w-full sm:w-auto"
          >
            Novo usuário
          </Button>
        </div>
      </div>

      {error ? <FormError message={error} /> : null}
      {deleteError ? <FormError message={deleteError} /> : null}

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/40">
          <Spinner />
        </div>
      ) : (
        <UsersTable
          users={users}
          onRequestDelete={(id) => setDeleteConfirmId(id)}
          isDeletingId={isDeletingId}
        />
      )}

      <ConfirmDialog
        open={deleteConfirmId !== null}
        title="Remover usuário?"
        description={
          <>
            Tem certeza que deseja remover{' '}
            <strong className="text-slate-200">
              {pendingDeleteUser?.name ?? 'este usuário'}
            </strong>
            ?
            <span className="mt-3 block text-slate-400">
              Esta ação é <strong className="text-rose-300">irreversível</strong> e não pode ser desfeita.
            </span>
          </>
        }
        confirmLabel="Remover"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        confirmLoadingLabel="Removendo..."
        isConfirming={deleteConfirmId !== null && isDeletingId === deleteConfirmId}
        onClose={() => {
          if (deleteConfirmId !== null && isDeletingId === deleteConfirmId) return
          setDeleteConfirmId(null)
        }}
        onConfirm={async () => {
          if (deleteConfirmId == null) return
          await executeDelete(deleteConfirmId)
        }}
      />
    </div>
  )
}

