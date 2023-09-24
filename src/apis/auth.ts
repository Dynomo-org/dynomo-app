import network from '@/utils/network'

const loginUser = (payload: LoginPayload) => network.post('/user/login', JSON.stringify(payload))
const registerUser = (payload: RegisterPayload) => network.post('/user/register', JSON.stringify(payload))

const authApi = {
    loginUser,
    registerUser
}

export default authApi