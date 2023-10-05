export type CreateKeystoreRequest = {
    keystore_name: string
    full_name: string
    organization: string
    country: string
    alias: string
    key_password: string
    store_password: string
}

export type BuildStatus = {
    status: number
}

export type GetKeystoreListParam = {
    build_status: string
}

export type Keystore = {
    id: string
    name: string
    alias: string
    created_at: string
    download_url: string
    build_status: number
}

export type KeystoreList = {
    keystores: Keystore[]
    page: number
    total_page: number
}