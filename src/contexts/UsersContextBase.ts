import { createContext } from 'react'
import type { User } from '../types/user'

export type UsersContextValue = {
  users: User[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  deleteUser: (id: number) => Promise<void>
}

export const UsersContext = createContext<UsersContextValue | undefined>(undefined)

