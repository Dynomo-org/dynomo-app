export type Artifact = {
    id: string
    artifact_name: string
    app_name: string
    app_id: string
    icon_url: string
    download_url: string
    build_status: number
    created_at: string
}

export type ArtifactList = {
    artifacts: Artifact[]
    page: number
    total_page: number
}