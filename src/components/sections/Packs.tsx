"use client"
import { useI18n } from "@/context/I18nContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function Packs() {
    const { t } = useI18n()

    const packs = [
        {
            name: "Habits Pack",
            price: 29.99,
            features: ["Habit Tracker", "Morning Routine", "Video Guide"],
            highlight: false
        },
        {
            name: "Finance Pack",
            price: 34.99,
            features: ["Finance Sheet", "Investment Guide", "Savings Calculator"],
            highlight: false
        },
        {
            name: "Semi God Mode",
            price: 89.99,
            features: ["All Products Access", "Private Community", "1-on-1 Coaching Call", "Lifetime Updates"],
            highlight: true
        }
    ]

    return (
        <section id="packs" className="py-24 bg-secondary/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{t("packs.title")}</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {packs.map((pack, idx) => (
                        <Card
                            key={idx}
                            className={cn(
                                "p-8 flex flex-col gap-6 relative transition-all duration-300",
                                pack.highlight
                                    ? 'border-primary/50 bg-primary/5 shadow-2xl scale-105 z-10 ring-1 ring-primary/20'
                                    : 'bg-background/40 hover:bg-background/60 hover:scale-[1.02]'
                            )}
                        >
                            {pack.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                    Best Value
                                </div>
                            )}
                            <div className="text-center space-y-2 pt-2">
                                <h3 className="font-serif font-bold text-2xl">{pack.name}</h3>
                                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">${pack.price}</div>
                            </div>
                            <ul className="space-y-3 flex-1 py-4">
                                {pack.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button variant={pack.highlight ? 'default' : 'outline'} className="w-full">
                                {t("products.addToCart")}
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
