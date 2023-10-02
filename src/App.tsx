import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Alert, CssBaseline, Snackbar } from '@mui/material'
import loadable from '@loadable/component'

import userApi from '@/apis/user'

// import for stores
import useAuthStore from '@/stores/auth'
import useSnackbarStore from '@/stores/snackbar'

// import for pages
const Layout = loadable(() => import('@/layouts'))
const AuthPage = loadable(() => import('@/pages/auth'))
const DashboardPage = loadable(() => import('@/pages/dashboard'))
const AppMainPage = loadable(() => import('@/pages/app-main'))

const ProtectedRoute = () => {
  const auth = useAuthStore()
  const { isLoading, error, data: user } = useQuery(userApi.GET_USER_INFO_KEY, userApi.getUserInfo, {
    enabled: !!auth.accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    onError: () => {
      auth.clearAuth()
    }
  })

  if (isLoading) {
    return <>loading gan...</>
  }

  return user && !error ? <Outlet /> : <Navigate to='/auth' />
}

const App = () => {
  const snackbar = useSnackbarStore()

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute />} >
            <Route element={<Layout />} >
              <Route index element={<DashboardPage />} />
              <Route path='/app/:id' element={<AppMainPage />} />
            </Route>
          </Route>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='*' element={<p>not found :)</p>} />
        </Routes>
      </BrowserRouter>
      <Snackbar
        anchorOrigin={{ vertical: snackbar.vertical, horizontal: snackbar.horizontal }}
        autoHideDuration={1500}
        open={snackbar.isOpen}
        onClose={snackbar.close}
      >
        <Alert autoCapitalize='true' onClose={snackbar.close} severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
