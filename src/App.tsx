import { useCallback, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled from '@emotion/styled'
import { blue, blueGrey } from '@mui/material/colors'
import { Button, Snackbar, TextField, Typography } from '@mui/material'

import useSnackbarStore from '@store/snackbar'
import authAPI from '@api/auth'

import './App.css'
import useAuthStore from './stores/auth'

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: ${blue[500]};
    justify-content: space-around;
    padding: 2em;
  `

const Column = styled.div`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: left;
    flex: 1;
  `

const LoginFormContainer = styled.div`
    background-color: white;
    border-radius: 2em;
    padding: 2em;
    padding-top: 3em;
    min-width: 60%;
  `

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
  `

const ActionText = styled.span`
    color: ${blue[500]};
    font-weight: bold;
    cursor: pointer;
  `

const authFormMap = {
  login: [
    {
      name: "email",
      label: "Email",
      type: "text",
      validation: {
        required: "invalid",
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
      }
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      validation: {
        required: true,
      }
    },
  ],
  register: [
    {
      name: "full_name",
      label: "Full Name",
      type: "text",
      validation: {
        required: true,
        maxLength: 25,
      }
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      validation: {
        required: true,
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
      }
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      validation: {
        required: true,
        maxLength: 16,
      }
    },
  ]
}

const AuthPage = () => {
  const { register, formState: { errors }, handleSubmit } = useForm()
  const [isModeLogin, setIsModeLogin] = useState(true)
  const showSnackbar = useSnackbarStore(store => store.show)
  const authState = useAuthStore()

  const mutation = useMutation(authAPI.registerUser, {
    onError(error: string) {
      showSnackbar(error)
    },
    onSuccess(data) {
      console.log(data)
      authState.setAuth({
        accessToken: data.token,
        userID: data.id
      })
    },
  })

  const onActionTextClick = useCallback(() => {
    setIsModeLogin(prev => !prev)
  }, [])

  const onAuthFormSubmit = useCallback((data: any) => {
    mutation.mutate({
      FullName: data.full_name,
      Email: data.email,
      Password: data.password
    })
  }, [isModeLogin])

  return <Container>
    <Column>
      <div>
        <Typography variant='h2' fontWeight={500}>Login Dulu Gan</Typography>
        <Typography>Bisa daftar dulu kalau belum punya akun :)</Typography>
      </div>
    </Column>
    <Column>
      <LoginFormContainer>
        <LoginForm onSubmit={handleSubmit(onAuthFormSubmit)}>
          {authFormMap[isModeLogin ? 'login' : 'register'].map(item => (
            <TextField
              key={item.name}
              {...register(item.name, item.validation)} label={item.label} name={item.name} type={item.type}
              aria-invalid={errors[item.name] ? "true" : "false"}
            />
          ))}
          <Button type='submit' variant='contained' style={{ marginTop: '2em' }}>{isModeLogin ? 'Login' : 'Daftar'}</Button>
        </LoginForm>
        <Typography style={{ marginTop: '1em' }} color={blueGrey[900]} align='center'>
          {isModeLogin ? 'Belum punya akun?' : 'Sudah punya akun?'} <ActionText onClick={onActionTextClick}>{isModeLogin ? 'Daftar' : 'Masuk'}</ActionText>
        </Typography>
      </LoginFormContainer>
    </Column>
  </Container>
}

function App() {
  const { value: snackbar, close } = useSnackbarStore()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<p>In development :)</p>} />
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
      <Snackbar
        autoCapitalize='true'
        autoHideDuration={1500}
        open={snackbar.isOpen}
        message={snackbar.message}
        anchorOrigin={{ horizontal: snackbar.horizontal, vertical: snackbar.vertical }}
        onClose={close}
      />
    </>
  )
}

export default App
