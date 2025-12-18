import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-white/10 dark:bg-black/20 dark:hover:bg-black/30 hover:-translate-y-1",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

export { Card }
