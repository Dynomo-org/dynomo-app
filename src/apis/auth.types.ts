export type LoginPayload = {
    email: string
    password: string
}

export type RegisterPayload = {
    full_name: string
    email: string
    password: string
}

export type AuthResponse = {
    token: string
    id: string
}