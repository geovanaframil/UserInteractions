import type { User } from '../../types/user'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'
import { FiEdit2, FiLoader } from 'react-icons/fi'
import { HiOutlineTrash } from 'react-icons/hi2'

export function UsersTable({
  users,
  onDelete,
  isDeletingId,
}: {
  users: User[]
  onDelete?: (id: number) => Promise<void>
  isDeletingId?: number | null
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-slate-950/40">
      <table className="w-full border-collapse text-sm">
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
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">
                Nenhum usuário encontrado.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id} className="border-t border-slate-800 transition-colors hover:bg-indigo-500/10">
                <td className="px-4 py-3.5 font-medium text-slate-100">{u.name}</td>
                <td className="px-4 py-3.5 text-slate-300">{u.email}</td>
                <td className="px-4 py-3.5 text-slate-300">{u.phone}</td>
                <td className="px-4 py-3.5 text-slate-300">{u.city}</td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/users/${u.id}/edit`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/10 text-indigo-200 transition-all duration-200 ease-out hover:bg-indigo-500/20 hover:text-indigo-100"
                      aria-label={`Editar ${u.name}`}
                      title="Editar"
                    >
                      <FiEdit2 size={16} />
                    </Link>
                    {onDelete ? (
                      <Button
                        variant="danger"
                        disabled={isDeletingId === u.id}
                        onClick={async () => onDelete(u.id)}
                        className="h-9 w-9 px-0 py-0"
                        aria-label={`Remover ${u.name}`}
                        title="Remover"
                      >
                        {isDeletingId === u.id ? (
                          <FiLoader size={16} className="animate-spin" aria-hidden />
                        ) : (
                          <HiOutlineTrash size={18} className="shrink-0" aria-hidden />
                        )}
                      </Button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

