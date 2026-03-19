import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
  leftIcon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'primary',
  isLoading = false,
  leftIcon,
  disabled,
  className = '',
  children,
  ...rest
}: Props) {
  const computedDisabled = disabled || isLoading

  const base =
    'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

  const variants: Record<NonNullable<Props['variant']>, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-500',
  }

  return (
    <button
      {...rest}
      disabled={computedDisabled}
      className={[base, variants[variant], className].join(' ')}
    >
      {leftIcon}
      {isLoading ? 'Salvando...' : children}
    </button>
  )
}

