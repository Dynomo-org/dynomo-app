export type CreateTemplateRequest = {
    name: string
    repository_url: string
}

export type Template = {
    id: string
    name: string
    repository_url: string
    styles: any
    strings: any
}

export type TemplateList = {
    id: string
    name: string
    repository_url: string,
    created_at: string
}[]