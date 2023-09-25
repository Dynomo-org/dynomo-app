import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Snackbar } from '@mui/material'

import userApi from '@/apis/user'

// import for stores
import useAuthStore from '@/stores/auth'
import useSnackbarStore from '@/stores/snackbar'

// import for pages
import AuthPage from '@/pages/auth'

const ProtectedRoute = () => {
  const token = useAuthStore(state => state.accessToken)
  const { isLoading, error, data: user } = useQuery(userApi.GET_USER_INFO_KEY, userApi.getUserInfo, {
    enabled: !!token,
    staleTime: 5 * 60 * 1000 // 5 minutes
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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute />} >
            <Route index element={<p>Masuk</p>} />
          </Route>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='*' element={<p>not found :)</p>} />
        </Routes>
      </BrowserRouter>
      <Snackbar
        autoCapitalize='true'
        autoHideDuration={1500}
        open={snackbar.isOpen}
        message={snackbar.message}
        anchorOrigin={{ horizontal: snackbar.horizontal, vertical: snackbar.vertical }}
        onClose={snackbar.close}
      />
    </>
  )
}

export default App
