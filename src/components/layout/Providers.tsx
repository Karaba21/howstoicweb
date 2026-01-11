"use client"

import { GamificationProvider } from "@/context/GamificationContext"
import { AuthProvider } from "@/context/AuthContext"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <GamificationProvider>
                {children}
            </GamificationProvider>
        </AuthProvider>
    )
}
