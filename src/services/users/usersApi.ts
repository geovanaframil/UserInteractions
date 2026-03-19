import type { User, UserFormValues } from '../../types/user'
import { httpClient } from '../api/httpClient'

function getAxiosErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axiosError = error as any
    const status = axiosError?.response?.status
    const data = axiosError?.response?.data

    if (status === 404) return 'Usuário não encontrado.'
    if (typeof data === 'string' && data.trim()) return data
    if (typeof data?.error === 'string' && data.error.trim()) return data.error
    if (typeof axiosError?.message === 'string' && axiosError.message.trim()) return axiosError.message
    return 'Erro ao processar requisição.'
  }

  if (error instanceof Error) return error.message
  return 'Erro desconhecido.'
}

export async function fetchUsers(): Promise<User[]> {
  const response = await httpClient.get<User[]>('/users')
  return response.data
}

export async function fetchUserById(id: number): Promise<User> {
  const response = await httpClient.get<User>(`/users/${id}`)
  return response.data
}

export async function createUser(values: UserFormValues): Promise<User> {
  const response = await httpClient.post<User>('/users', values)
  return response.data
}

export async function updateUser(id: number, values: UserFormValues): Promise<User> {
  const response = await httpClient.put<User>(`/users/${id}`, values)
  return response.data
}

export async function deleteUser(id: number): Promise<void> {
  await httpClient.delete(`/users/${id}`)
}

export const usersApi = {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  getAxiosErrorMessage,
}

