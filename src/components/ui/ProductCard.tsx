"use client"

import { Product } from "@/data/products"
import { Card } from "./Card"
import { Button } from "./Button"
import { useCart } from "@/context/CartContext"
import { useI18n } from "@/context/I18nContext"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
    product: Product
    className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
    const { addItem } = useCart()
    const { t } = useI18n()

    return (
        <Card className={cn("overflow-hidden flex flex-col h-full group border-border/50 bg-secondary/10 hover:bg-secondary/20", className)}>
            <div className="relative aspect-square bg-muted overflow-hidden">
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center text-primary/20 font-serif font-bold text-4xl group-hover:scale-110 transition-transform duration-500">
                    HS
                </div>
                {product.isNew && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        New
                    </div>
                )}
                {product.popular && (
                    <div className="absolute top-2 left-2 bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                        Popular
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col flex-1 gap-4">
                <div className="space-y-1">
                    <h3 className="font-serif font-bold text-xl leading-snug">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">${product.price}</span>
                            {product.oldPrice && (
                                <span className="text-xs text-muted-foreground line-through">${product.oldPrice}</span>
                            )}
                        </div>
                    </div>
                    <Button size="sm" onClick={() => addItem(product)} className="gap-2">
                        <span>{t("products.addToCart")}</span>
                        <ShoppingCart className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}
