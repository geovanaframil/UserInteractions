import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppShell } from './components/layout/AppShell'
import { AppRoutes } from './routes/AppRoutes'
import { UsersProvider } from './contexts/UsersContext'

export default function App() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              border: '1px solid #e2e8f0',
              padding: '12px 14px',
              color: '#0f172a',
              background: '#ffffff',
            },
          }}
          containerStyle={{ zIndex: 99999 }}
        />
        <AppShell>
          <AppRoutes />
        </AppShell>
      </UsersProvider>
    </BrowserRouter>
  )
}
