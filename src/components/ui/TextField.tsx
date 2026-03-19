import type { ChangeEvent, FocusEvent, HTMLAttributes } from 'react'

type Props = {
  label: string
  name: string
  value: string
  type?: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  maxLength?: number
  autoComplete?: string
  placeholder?: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: FocusEvent<HTMLInputElement>) => void
}

export function TextField({
  label,
  name,
  value,
  type = 'text',
  inputMode,
  maxLength,
  autoComplete,
  placeholder,
  error,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold tracking-wide text-slate-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        inputMode={inputMode}
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={[
          'w-full rounded-lg border px-3 py-2.5 text-sm text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-500',
          error
            ? 'border-rose-400/50 bg-rose-500/10 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/25'
            : 'border-slate-700 bg-slate-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/25',
        ].join(' ')}
      />
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </div>
  )
}

