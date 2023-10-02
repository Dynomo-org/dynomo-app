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
    enable_open: string
    enable_banner: string
    enable_interstitial: string
    enable_native: string
    enable_reward: string
    interstitial_interval_second: string
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