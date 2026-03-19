import type { User } from '../../types/user'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'
import { FiEdit2, FiLoader } from 'react-icons/fi'
import { HiOutlineTrash } from 'react-icons/hi2'

function UserActions({
  user,
  onDelete,
  isDeletingId,
}: {
  user: User
  onDelete?: (id: number) => Promise<void>
  isDeletingId: number | null
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        to={`/users/${user.id}/edit`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/10 text-indigo-200 transition-all duration-200 ease-out hover:bg-indigo-500/20 hover:text-indigo-100"
        aria-label={`Editar ${user.name}`}
        title="Editar"
      >
        <FiEdit2 size={16} />
      </Link>
      {onDelete ? (
        <Button
          variant="danger"
          disabled={isDeletingId === user.id}
          onClick={async () => onDelete(user.id)}
          className="h-9 w-9 px-0 py-0"
          aria-label={`Remover ${user.name}`}
          title="Remover"
        >
          {isDeletingId === user.id ? (
            <FiLoader size={16} className="animate-spin" aria-hidden />
          ) : (
            <HiOutlineTrash size={18} className="shrink-0" aria-hidden />
          )}
        </Button>
      ) : null}
    </div>
  )
}

function UserCard({
  user,
  onDelete,
  isDeletingId,
}: {
  user: User
  onDelete?: (id: number) => Promise<void>
  isDeletingId: number | null
}) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/40">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-100">{user.name}</h3>
          <p className="mt-0.5 break-all text-sm text-slate-400">{user.email}</p>
        </div>
        <UserActions user={user} onDelete={onDelete} isDeletingId={isDeletingId} />
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-800 pt-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Telefone</dt>
          <dd className="mt-0.5 text-slate-300">{user.phone}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cidade</dt>
          <dd className="mt-0.5 text-slate-300">{user.city}</dd>
        </div>
      </dl>
    </article>
  )
}

export function UsersTable({
  users,
  onDelete,
  isDeletingId,
}: {
  users: User[]
  onDelete?: (id: number) => Promise<void>
  isDeletingId?: number | null
}) {
  const deleting = isDeletingId ?? null

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-10 text-center text-sm text-slate-400 shadow-lg shadow-slate-950/40">
        Nenhum usuário encontrado.
      </div>
    )
  }

  return (
    <>
      {/* Mobile / tablet: cards */}
      <div className="space-y-3 lg:hidden">
        {users.map((u) => (
          <UserCard key={u.id} user={u} onDelete={onDelete} isDeletingId={deleting} />
        ))}
      </div>

      {/* Desktop: tabela com scroll horizontal de segurança */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-slate-950/40 lg:block">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead className="bg-slate-900">
            <tr className="text-left">
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Nome</th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400">E-mail</th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Telefone</th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Cidade</th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-800 transition-colors hover:bg-indigo-500/10">
                <td className="px-4 py-3.5 font-medium text-slate-100">{u.name}</td>
                <td className="px-4 py-3.5 text-slate-300">{u.email}</td>
                <td className="px-4 py-3.5 text-slate-300">{u.phone}</td>
                <td className="px-4 py-3.5 text-slate-300">{u.city}</td>
                <td className="px-4 py-3.5">
                  <UserActions user={u} onDelete={onDelete} isDeletingId={deleting} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
