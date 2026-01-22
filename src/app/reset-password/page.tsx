"use client"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowLeft, Lock } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [validToken, setValidToken] = useState(false)

    useEffect(() => {
        // Check if we have a valid session from the email link
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setValidToken(true)
            } else {
                setError("Invalid or expired reset link. Please request a new one.")
            }
        })
    }, [])

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            setSuccess(true)

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/login")
            }, 2000)
        } catch (err: any) {
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
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold">Reset Password</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your new password
                    </p>
                </div>

                {success ? (
                    <div className="space-y-4">
                        <div className="p-4 text-sm text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-md border border-green-200 dark:border-green-800">
                            <p className="font-medium mb-1">Password updated successfully!</p>
                            <p>Redirecting to login...</p>
                        </div>
                    </div>
                ) : !validToken ? (
                    <div className="space-y-4">
                        <div className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800">
                            <p className="font-medium mb-1">Invalid Reset Link</p>
                            <p>This link is invalid or has expired. Please request a new password reset.</p>
                        </div>
                        <Link href="/forgot-password">
                            <Button className="w-full">
                                Request New Reset Link
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleResetPassword}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800">
                                {error}
                            </div>
                        )}

                        <Button className="w-full" size="lg" disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                        </Button>
                    </form>
                )}
            </Card>
        </main>
    )
}
