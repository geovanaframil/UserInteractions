export function Spinner({ label = 'Carregando...' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600"
        aria-hidden="true"
      />
      <span className="text-sm text-slate-700">{label}</span>
    </div>
  )
}

