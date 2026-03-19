import type { User } from '../../types/user'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

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
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50">
          <tr className="text-left">
            <th className="px-4 py-3 font-semibold text-slate-700">Nome</th>
            <th className="px-4 py-3 font-semibold text-slate-700">E-mail</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Telefone</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Cidade</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                Nenhum usuário encontrado.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{u.name}</td>
                <td className="px-4 py-3 text-slate-700">{u.email}</td>
                <td className="px-4 py-3 text-slate-700">{u.phone}</td>
                <td className="px-4 py-3 text-slate-700">{u.city}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/users/${u.id}/edit`}
                      className="rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-200"
                    >
                      Editar
                    </Link>
                    {onDelete ? (
                      <Button
                        variant="danger"
                        isLoading={isDeletingId === u.id}
                        onClick={async () => onDelete(u.id)}
                        className="px-3 py-2 text-xs"
                      >
                        Remover
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

