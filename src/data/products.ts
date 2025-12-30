export interface Product {
    id: string
    name: string
    description: string
    price: number
    oldPrice?: number
    category: "habits" | "reading" | "fitness" | "finance" | "mindset"
    image?: string
    isNew?: boolean
    popular?: boolean
}

export const products: Product[] = [
    {
        id: "1",
        name: "Ultimate Habit Tracker",
        description: "Track your daily habits and build streaks that last forever.",
        price: 19.99,
        oldPrice: 29.99,
        category: "habits",
        isNew: true,
        popular: true,
    },
    {
        id: "2",
        name: "Stoic Morning Journal",
        description: "Start your day with clarity and intention using ancient wisdom.",
        price: 14.99,
        category: "mindset",
    },
    {
        id: "3",
        name: "Finance Master Sheet",
        description: "Control your expenses, investments, and savings in one place.",
        price: 24.99,
        oldPrice: 35.00,
        category: "finance",
        popular: true,
    },
    {
        id: "4",
        name: "Reading List Manager",
        description: "Organize your library, track progress, and take notes.",
        price: 9.99,
        category: "reading",
    },
    {
        id: "5",
        name: "Fitness Progression Log",
        description: "Log your workouts, weights, and body metrics easily.",
        price: 12.99,
        category: "fitness",
    },
    {
        id: "6",
        name: "Deep Focus Planner",
        description: "Structure your deep work sessions and eliminate distractions.",
        price: 19.99,
        category: "mindset",
        isNew: true,
    },
    {
        id: "tomo1",
        name: "Tomo 1: Fundamentals",
        description: "The beginning of your Stoic journey. Master the basics.",
        price: 6.99,
        category: "reading",
        image: "/tomo1.png",
        isNew: true,
    },
    {
        id: "tomo2",
        name: "Tomo 2: Adavanced Practice",
        description: "Deepen your understanding and application of Stoicism.",
        price: 6.99,
        category: "reading",
        image: "/tomo2.png",
    },
    {
        id: "tomo3",
        name: "Tomo 3: Mastery",
        description: "Achieve true resilience and inner peace.",
        price: 6.99,
        category: "reading",
        image: "/tomo3.png",
        popular: true,
    },
]
