import { useContext } from 'react'
import { UsersContext } from './UsersContextBase'

export function useUsersContext() {
  const ctx = useContext(UsersContext)
  if (!ctx) throw new Error('useUsersContext deve ser usado dentro de UsersProvider.')
  return ctx
}

