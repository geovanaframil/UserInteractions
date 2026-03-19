import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <header className="border-b border-slate-800 bg-slate-950/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <div className="min-w-0 space-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">Teste Técnico</p>
            <h1 className="truncate text-base font-semibold text-slate-100 sm:text-lg">Cadastro de Usuários</h1>
          </div>

          <nav className="flex shrink-0 items-center gap-2 sm:justify-end">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                [
                  'rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'border-indigo-400/40 bg-indigo-500/15 text-indigo-200'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-200',
                ].join(' ')
              }
            >
              Usuários
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-3 py-6 pb-10 sm:px-4 sm:py-8 max-sm:pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        {children}
      </main>
    </div>
  )
}

