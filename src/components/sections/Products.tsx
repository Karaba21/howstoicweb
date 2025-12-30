"use client"

import { useState } from "react"
import { useI18n } from "@/context/I18nContext"
import { products } from "@/data/products"
import { ProductCard } from "@/components/ui/ProductCard"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { PurchaseModal } from "@/components/ui/PurchaseModal"
import { Product } from "@/data/products"

export function Products() {
    const { t } = useI18n()
    const [filter, setFilter] = useState("all")
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const categories = [
        { id: "all", label: t("products.filter.all") },
        { id: "habits", label: t("products.filter.habits") },
        { id: "reading", label: t("products.filter.reading") },
        { id: "fitness", label: t("products.filter.fitness") },
        { id: "finance", label: t("products.filter.finance") },
        { id: "mindset", label: t("products.filter.mindset") },
    ]

    const filteredProducts = filter === "all"
        ? products
        : products.filter(p => p.category === filter)

    return (
        <section id="products" className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{t("products.title")}</h2>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent",
                                    filter === cat.id
                                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                                        : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground border-border/50"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    <AnimatePresence>
                        {filteredProducts.map(product => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={product.id}
                                onClick={() => {
                                    if (product.category === "reading" || product.id.startsWith("tomo")) {
                                        setSelectedProduct(product)
                                    }
                                }}
                            >
                                <ProductCard
                                    product={product}
                                    onPurchase={() => setSelectedProduct(product)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
            <PurchaseModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
            />
        </section >
    )
}
