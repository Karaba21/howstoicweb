"use client"

import React from "react"
import { useCart } from "@/context/CartContext"
import { useI18n } from "@/context/I18nContext"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function CartDrawer() {
    const { isCartOpen, toggleCart, items, removeItem, total } = useCart()
    const { t } = useI18n()

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                        onClick={toggleCart}
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border z-[101] p-6 shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                <span className="font-serif font-bold text-xl">{t("cart.title")}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={toggleCart}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                                <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                                <p>{t("cart.empty")}</p>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-4">
                                {items.map((item) => (
                                    <div key={item.internalId} className="flex gap-4 p-4 rounded-lg border border-border/50 bg-secondary/20">
                                        <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground overflow-hidden relative flex-shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <span>IMG</span>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div className="pr-2">
                                                    <h4 className="font-medium line-clamp-2 text-sm">{item.name}</h4>
                                                    {item.variantTitle && item.variantTitle !== "Default Title" && (
                                                        <span className="text-xs text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded border border-border/50 inline-block mt-1">
                                                            {item.variantTitle}
                                                        </span>
                                                    )}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive flex-shrink-0"
                                                    onClick={() => removeItem(item.internalId)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <p className="font-bold text-primary text-sm">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="border-t border-border pt-6 mt-6 space-y-4">
                            <div className="flex items-center justify-between text-lg font-bold">
                                <span>{t("cart.total")}</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Button className="w-full" size="lg" disabled={items.length === 0} onClick={() => {
                                // Filter out items without variantId and warn?
                                // Assuming all have variantId if fetched correctly.
                                console.log("Checkout items:", items)
                                const variants = items.map(item => `${item.variantId}:1`)
                                const checkoutUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${variants.join(',')}`
                                window.location.href = checkoutUrl
                            }}>
                                {t("cart.checkout")}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
