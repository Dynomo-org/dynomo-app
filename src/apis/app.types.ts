export type CreateAppRequest = {
    app_name: string
    package_name: string
}

export type App = {
    id: string
    name: string
    package_name: string
    icon_url: string
}

export type AppList = {
    apps: App[]
    page: number
    total_page: number
}