interface AuthState {
    accessToken?: string
    userID?: string
}

interface AuthStore {
    accessToken?: string
    userID?: string
    setAuth: (state: AuthState) => void
    clearAuth: () => void
}