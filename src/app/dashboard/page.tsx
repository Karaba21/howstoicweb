import { UserDashboard } from "@/components/sections/UserDashboard"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function DashboardPage() {
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
