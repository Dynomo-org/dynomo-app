type Menu = {
    title: string
    getHref: (param?: Partial<QueryParam>) => string
    icon: any
}

export type MenuMap = {
    [key: string]: Menu[]
}

export type QueryParam = {
    app_id: string
}