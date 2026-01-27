export interface Product {
    id: string
    handle: string
    name: string
    description: string
    price: number
    oldPrice?: number
    category: "habits" | "reading" | "fitness" | "finance" | "mindset"
    image?: string
    isNew?: boolean
    popular?: boolean
    onlineStoreUrl?: string
    collections?: string[]
    variantId?: string
    variants?: {
        id: string
        title: string
        price: number
    }[]
}

