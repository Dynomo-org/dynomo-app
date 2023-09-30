import network from '@/utils/network'
import { AuthResponse, LoginPayload, RegisterPayload } from './auth.types'

const loginUser = (payload: LoginPayload): Promise<AuthResponse> => network.post('/user/login', JSON.stringify(payload))
const registerUser = (payload: RegisterPayload): Promise<AuthResponse> => network.post('/user/register', JSON.stringify(payload))

const authApi = {
    loginUser,
    registerUser
}

export default authApi