"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import { Product } from "@/data/products"

interface PurchaseModalProps {
    isOpen: boolean
    onClose: () => void
    product: Product | null
}

export function PurchaseModal({ isOpen, onClose, product }: PurchaseModalProps) {
    if (!isOpen || !product) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border/50">
                        <h3 className="font-serif font-bold text-xl">Confirm Purchase</h3>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        <div className="flex gap-6">
                            <div className="relative w-32 h-40 rounded-lg overflow-hidden border border-border/50 bg-secondary/20 flex-shrink-0">
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                        <span className="font-serif font-bold text-primary text-2xl">HS</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-lg">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">{product.description}</p>
                                <div className="pt-2">
                                    <span className="font-bold text-2xl text-[var(--gold)]">${product.price}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-secondary/20 rounded-lg p-4 text-center border border-border/50">
                            <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                            <p className="font-medium">Todavía no está disponible</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-border/50 bg-secondary/10 flex justify-end gap-3">
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="gap-2 bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black">
                            <CreditCard className="w-4 h-4" />
                            Pay Now
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
