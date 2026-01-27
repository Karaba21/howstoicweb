"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"

export interface CartItem {
    internalId: string // Unique ID for this specific cart entry
    id: string // Product ID
    name: string
    price: number
    image?: string
    variantId?: string
    variantTitle?: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "internalId">) => void
    removeItem: (internalId: string) => void
    toggleCart: () => void
    isCartOpen: boolean
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addItem = (item: Omit<CartItem, "internalId">) => {
        const newItem = { ...item, internalId: Math.random().toString(36).substr(2, 9) }
        setItems((prev) => [...prev, newItem])
        setIsCartOpen(true) // Open cart when adding
    }

    const removeItem = (internalId: string) => {
        setItems((prev) => prev.filter((i) => i.internalId !== internalId))
    }

    const toggleCart = () => setIsCartOpen(!isCartOpen)

    const total = items.reduce((acc, item) => acc + item.price, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, toggleCart, isCartOpen, total }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
