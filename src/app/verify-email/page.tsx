"use client"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Mail, CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function VerifyEmailPage() {
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || "tu email"

    return (
        <main className="min-h-screen relative flex items-center justify-center p-4">
            {/* Background */}
            <div className="absolute inset-0 bg-background overflow-hidden -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            <Card className="w-full max-w-md p-8 backdrop-blur-xl bg-background/60 border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20 relative">
                        <Mail className="w-8 h-8 text-primary" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-serif font-bold mb-2">¡Verificá tu email!</h1>
                    <p className="text-muted-foreground text-sm">
                        Te enviamos un email de confirmación
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm text-center mb-2">
                            Enviamos un link de verificación a:
                        </p>
                        <p className="text-center font-medium text-primary break-all">
                            {email}
                        </p>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Próximos pasos:</p>
                        <ol className="list-decimal list-inside space-y-1 ml-2">
                            <li>Revisá tu bandeja de entrada</li>
                            <li>Hacé click en el link de confirmación</li>
                            <li>¡Listo! Ya podés iniciar sesión</li>
                        </ol>
                    </div>

                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                            💡 <strong>Tip:</strong> Si no ves el email, revisá tu carpeta de spam o promociones.
                        </p>
                    </div>

                    <div className="pt-4 space-y-2">
                        <Link href="/login">
                            <Button className="w-full" variant="outline">
                                Ir a Iniciar Sesión
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button className="w-full" variant="ghost">
                                Volver al Inicio
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </main>
    )
}
