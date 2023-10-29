export type QueryParam = {
    template_id: string
}

export type Template = {
    name: string
    repository_url: string
    styles: {key: string, value:string}[]
    strings: {key: string, value:string}[]
}