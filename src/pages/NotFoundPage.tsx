import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/40">
      <h2 className="text-lg font-semibold text-slate-100">Página não encontrada</h2>
      <p className="mt-2 text-sm text-slate-400">Verifique a URL ou volte para a listagem.</p>
      <div className="mt-4">
        <Link
          to="/users"
          className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-indigo-500/95 hover:shadow-md"
        >
          Voltar
        </Link>
      </div>
    </div>
  )
}

