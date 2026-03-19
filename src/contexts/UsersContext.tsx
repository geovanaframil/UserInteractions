import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { UsersContextValue } from './UsersContextBase'
import { UsersContext } from './UsersContextBase'
import { usersApi } from '../services/users/usersApi'

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UsersContextValue['users']>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await usersApi.fetchUsers()
      setUsers(data)
    } catch (err) {
      setError(usersApi.getAxiosErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const deleteUser = useCallback(async (id: number) => {
    await usersApi.deleteUser(id)
    await refresh()
  }, [refresh])

  const value = useMemo<UsersContextValue>(
    () => ({
      users,
      loading,
      error,
      refresh,
      deleteUser,
    }),
    [users, loading, error, refresh, deleteUser],
  )

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

