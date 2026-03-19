import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-slate-500">Teste Técnico</p>
            <h1 className="text-lg font-semibold text-slate-900">Cadastro de Usuários</h1>
          </div>

          <nav className="flex items-center gap-3">
            <Link
              to="/users"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Usuários
            </Link>
            <Link
              to="/users/new"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Novo
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  )
}

