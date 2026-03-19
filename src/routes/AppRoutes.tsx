import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { UserFormPage } from '../pages/UserFormPage'
import { UsersListPage } from '../pages/UsersListPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="/users" element={<UsersListPage />} />
      <Route path="/users/new" element={<UserFormPage />} />
      <Route path="/users/:id/edit" element={<UserFormPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

