"use client"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            // Get the redirect URL - use production URL or construct from window
            const redirectUrl = typeof window !== 'undefined'
                ? `${window.location.origin}/auth/callback?next=/reset-password`
                : 'https://howstoic.com/auth/callback?next=/reset-password'

            console.log('Attempting password reset for:', email)
            console.log('Redirect URL:', redirectUrl)

            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: redirectUrl,
            })

            console.log('Reset password response:', { data, error })

            if (error) {
                console.error('Reset password error:', error)
                // Show detailed error message
                const errorMsg = error.message || error.toString()
                throw new Error(`Supabase Error: ${errorMsg}. Verificá la configuración de SMTP en Supabase Dashboard → Authentication → Email Templates`)
            }

            // Supabase returns success even if user doesn't exist (for security)
            // So we show success message regardless
            setSuccess(true)
        } catch (err: any) {
            console.error('Full error:', err)
            setError(err.message || "An error occurred")
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
                <Link href="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                </Link>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold">Forgot Password?</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                {success ? (
                    <div className="space-y-4">
                        <div className="p-4 text-sm text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-md border border-green-200 dark:border-green-800">
                            <p className="font-medium mb-1">Check your email!</p>
                            <p>We've sent a password reset link to <strong>{email}</strong></p>
                        </div>
                        <Link href="/login">
                            <Button className="w-full" variant="outline">
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleResetRequest}>
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

                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800">
                                {error}
                            </div>
                        )}

                        <Button className="w-full" size="lg" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </form>
                )}

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Remember your password? <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                </div>
            </Card>
        </main>
    )
}
