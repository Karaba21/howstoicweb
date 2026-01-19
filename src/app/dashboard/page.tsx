"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserDashboard } from "@/components/sections/UserDashboard"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { useAuth } from "@/context/AuthContext"

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </main>
        )
    }

    if (!user) {
        return null
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold">Your Journey</h1>
                    <p className="text-muted-foreground">Track your progress and achievements.</p>
                </div>
                <UserDashboard />
            </div>
            <Footer />
        </main>
    )
}
