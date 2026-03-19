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
      <label htmlFor={name} className="block text-sm font-medium text-slate-800">
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
          'w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors',
          error ? 'border-rose-300 bg-rose-50 focus:border-rose-400' : 'border-slate-300 focus:border-indigo-500',
        ].join(' ')}
      />
      {error ? <p className="text-xs text-rose-700">{error}</p> : null}
    </div>
  )
}

