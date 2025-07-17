export interface APIResponse {
    message: string
    error?: any
    success?: boolean
    token?: string
    data?: any
}

export interface CardData {
    id?: number
    title: string
    description: string | null
    timing: string | null
    progress?: number
    subTitle?: string | null
    url?: string | null
    experience?: string
    openings?: number
    videoRequired?: boolean
    goodToHave?: string
    main?: string
    name?: string
    language?: string
    allMain?: string
    allGoodToHave?: string
    companyId?: number
    userId?: number
    status?: boolean
    archive?: boolean | null
    pointOfContact?: string | null
    createdAt?: string // ISO timestamp
    updatedAt?: string // ISO timestamp
}
