import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { blue, blueGrey } from '@mui/material/colors'
import { Button, LinearProgress, TextField, Typography } from '@mui/material'

import useSnackbarStore from '@/stores/snackbar'
import useAuthStore from '@/stores/auth'
import authAPI from '@/apis/auth'
import { AuthResponse } from '@/apis/auth.types'

import config from './config'

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
    margin-top: 1em;
    gap: 1em;
  `

const ActionText = styled.span`
    color: ${blue[500]};
    font-weight: bold;
    cursor: pointer;
  `

const AuthPage = () => {
    // hooks section
    const { register, clearErrors, formState: { errors }, handleSubmit } = useForm()
    const [isModeLogin, setIsModeLogin] = useState(true)
    const showSnackbar = useSnackbarStore(store => store.show)
    const authState = useAuthStore()

    const mutationConfig = {
        onError(error: string) {
            showSnackbar('error', error)
        },
        onSuccess(data: AuthResponse) {
            authState.setAuth({
                accessToken: data.token,
                userID: data.id
            })
            return
        },
    }
    const registerMutation = useMutation({ mutationFn: authAPI.registerUser, ...mutationConfig })
    const loginMutation = useMutation({ mutationFn: authAPI.loginUser, ...mutationConfig })

    // action handlers section
    const handleActionTextClick = useCallback(() => {
        clearErrors()
        setIsModeLogin(prev => !prev)
    }, [clearErrors])

    const handleAuthFormSubmit = useCallback((data: any) => {
        if (isModeLogin) {
            loginMutation.mutate(data)
            return
        }

        registerMutation.mutate(data)
    }, [isModeLogin, loginMutation, registerMutation])

    const isLoading = useMemo(() => loginMutation.isPending || registerMutation.isPending, [registerMutation, loginMutation])

    // renders section
    if (authState.accessToken) {
        return <Navigate to="/" replace />
    }

    return <Container>
        <Column>
            <div>
                <Typography variant='h2' fontWeight={500}>Login Dulu Gan</Typography>
                <Typography>Bisa daftar dulu kalau belum punya akun :)</Typography>
            </div>
        </Column>
        <Column>
            <LoginFormContainer>
                <LoginForm onSubmit={handleSubmit(handleAuthFormSubmit)}>
                    {config.authFormMap[isModeLogin ? 'login' : 'register'].map(item => (
                        <TextField
                            error={!!errors[item.name]}
                            helperText={errors[item.name] ? item.helperText : ""}
                            key={item.name}
                            {...register(item.name, item.validation)} label={item.label} name={item.name} type={item.type}
                            aria-invalid={errors[item.name] ? "true" : "false"}
                        />
                    ))}
                    {isLoading && <LinearProgress />}
                    <Button type='submit' variant='contained' style={{ marginTop: '2em' }}>{isModeLogin ? 'Login' : 'Daftar'}</Button>
                </LoginForm>
                <Typography style={{ marginTop: '1em' }} color={blueGrey[900]} align='center'>
                    {isModeLogin ? 'Belum punya akun?' : 'Sudah punya akun?'} <ActionText onClick={handleActionTextClick}>{isModeLogin ? 'Daftar' : 'Masuk'}</ActionText>
                </Typography>
            </LoginFormContainer>
        </Column>
    </Container>
}

export default AuthPage