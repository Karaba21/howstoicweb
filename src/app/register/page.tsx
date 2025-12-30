"use client"
import { useI18n } from "@/context/I18nContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowLeft, User, Lock, Mail, Gift } from "lucide-react"

export default function RegisterPage() {
    const { t } = useI18n()

    return (
        <main className="min-h-screen relative flex items-center justify-center p-4">
            {/* Background */}
            <div className="absolute inset-0 bg-background overflow-hidden -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            <Card className="w-full max-w-md p-8 backdrop-blur-xl bg-background/60 border-white/10 shadow-2xl">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                        <User className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold">Create Account</h1>
                    <p className="text-muted-foreground text-sm">Join the Stoic community today</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Marcus Aurelius"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            Referral Code
                            <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded animate-pulse">+Bonus XP</span>
                        </label>
                        <div className="relative">
                            <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
                                placeholder="Optional: Friend's ID"
                            />
                        </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2" size="lg">Sign Up</Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                </div>
            </Card>
        </main>
    )
}
