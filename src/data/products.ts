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
}

export const products: Product[] = [
    {
        id: "tomo1",
        handle: "tomo-1-fundamentals",
        name: "Tomo 1: Fundamentals",
        description: "The beginning of your Stoic journey. Master the basics.",
        price: 6.99,
        category: "reading",
        image: "/tomo1.png",
        isNew: true,
    },
    {
        id: "tomo2",
        handle: "tomo-2-advanced-practice",
        name: "Tomo 2: Advanced Practice",
        description: "Deepen your understanding and application of Stoicism.",
        price: 6.99,
        category: "reading",
        image: "/tomo2.png",
    },
    {
        id: "tomo3",
        handle: "tomo-3-mastery",
        name: "Tomo 3: Mastery",
        description: "Achieve true resilience and inner peace.",
        price: 6.99,
        category: "reading",
        image: "/tomo3.png",
        popular: true,
    },
]
