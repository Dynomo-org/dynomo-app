export interface AuthState {
    accessToken?: string
    userID?: string
}

export interface AuthStore {
    accessToken?: string
    userID?: string
    setAuth: (state: AuthState) => void
    clearAuth: () => void
}