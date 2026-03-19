import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
  /** Texto exibido enquanto `isLoading` é true (padrão: “Salvando...”) */
  loadingLabel?: string
  leftIcon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'primary',
  isLoading = false,
  loadingLabel = 'Salvando...',
  leftIcon,
  disabled,
  className = '',
  children,
  ...rest
}: Props) {
  const computedDisabled = disabled || isLoading

  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60'

  const variants: Record<NonNullable<Props['variant']>, string> = {
    primary:
      'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500/95 hover:shadow-md transition-all duration-200 ease-out focus:ring-indigo-400',
    secondary:
      'border border-slate-700 bg-slate-900 text-slate-200 hover:border-indigo-400/35 hover:bg-indigo-500/10 transition-all duration-200 ease-out hover:text-indigo-200 focus:ring-indigo-400/60',
    danger:
      'border border-rose-500/30 bg-rose-500/10 text-rose-200 shadow-sm hover:bg-rose-500/20 hover:shadow-md transition-all duration-200 ease-out focus:ring-rose-400',
  }

  return (
    <button
      {...rest}
      disabled={computedDisabled}
      className={[base, variants[variant], className].join(' ')}
    >
      {leftIcon}
      {isLoading ? loadingLabel : children}
    </button>
  )
}

