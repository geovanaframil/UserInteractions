import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">Página não encontrada</h2>
      <p className="mt-2 text-sm text-slate-600">Verifique a URL ou volte para a listagem.</p>
      <div className="mt-4">
        <Link
          to="/users"
          className="inline-flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Voltar
        </Link>
      </div>
    </div>
  )
}

