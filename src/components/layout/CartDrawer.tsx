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
                                {items.map((item, index) => (
                                    // Using index as key fallback for duplicate items if needed, or unique ID
                                    <div key={`${item.id}-${index}`} className="flex gap-4 p-4 rounded-lg border border-border/50 bg-secondary/20">
                                        <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground overflow-hidden relative">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <span>IMG</span>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium line-clamp-2 pr-4">{item.name}</h4>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <p className="font-bold text-primary">${item.price}</p>
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
                            <Button className="w-full" size="lg" disabled={items.length === 0}>
                                {t("cart.checkout")}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
