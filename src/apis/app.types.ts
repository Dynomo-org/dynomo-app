export type CreateAppRequest = {
    app_name: string
    package_name: string
}

export type App = {
    id: string
    owner_id: string
    name: string
    package_name: string
    template_id: string
    admob_app_id: string
    app_lovin_sdk_key: string
    version: string
    version_code: string
    icon_url: string
    privacy_policy_link: string
    strings: any // JSON Object
    styles: any // JSON Object
    enable_open: boolean
    enable_banner: boolean
    enable_interstitial: boolean
    enable_native: boolean
    enable_reward: boolean
    interstitial_interval_second: number
    created_at: string
    updated_at: string
}

export type AppList = {
    apps: {
        id: string
        name: string
        package_name: string
        icon_url: string
    }[]
    page: number
    total_page: number
}