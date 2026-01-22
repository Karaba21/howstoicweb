"use client"
import { useI18n } from "@/context/I18nContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowLeft, User, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
    const { t } = useI18n()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            router.push("/")
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen relative flex items-center justify-center p-4">
            {/* Background */}
            <div className="absolute inset-0 bg-background overflow-hidden -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
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
                    <h1 className="text-2xl font-serif font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm">Sign in to continue your journey</p>
                </div>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <span>Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                            {error}
                        </div>
                    )}

                    <Button className="w-full" size="lg" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create Account</Link>
                </div>
            </Card>
        </main>
    )
}
