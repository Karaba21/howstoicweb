"use client"

import { GamificationProvider } from "@/context/GamificationContext"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <GamificationProvider>
            {children}
        </GamificationProvider>
    )
}
