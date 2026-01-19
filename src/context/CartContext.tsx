"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"

export interface CartItem {
    id: string
    name: string
    price: number
    image?: string
    variantId?: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    toggleCart: () => void
    isCartOpen: boolean
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addItem = (item: CartItem) => {
        setItems((prev) => [...prev, item])
        setIsCartOpen(true) // Open cart when adding
    }

    const removeItem = (id: string) => {
        setItems((prev) => {
            const index = prev.findIndex((i) => i.id === id)
            if (index > -1) {
                const newItems = [...prev]
                newItems.splice(index, 1)
                return newItems
            }
            return prev
        })
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
