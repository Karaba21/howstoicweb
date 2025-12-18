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
]
