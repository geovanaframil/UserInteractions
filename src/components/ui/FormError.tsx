export function FormError({ message }: { message: string }) {
  return (
    <div
      className="rounded-lg border border-rose-500/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
      role="alert"
    >
      {message}
    </div>
  )
}

