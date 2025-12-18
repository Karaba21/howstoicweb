"use client"
import { useI18n } from "@/context/I18nContext"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { ArrowRight, Download, Infinity as InfinityIcon, Sliders } from "lucide-react"
import { Card } from "@/components/ui/Card"

export function Hero() {
    const { t } = useI18n()

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob opacity-50 mix-blend-multiply dark:mix-blend-lighten filter" />
                <div className="absolute top-[20%] right-[20%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 opacity-50 mix-blend-multiply dark:mix-blend-lighten filter" />
                <div className="absolute -bottom-32 left-[40%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000 opacity-50 mix-blend-multiply dark:mix-blend-lighten filter" />
            </div>

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="text-center lg:text-left space-y-6"
                >
                    <motion.h1 variants={item} className="text-5xl md:text-7xl font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 pb-2">
                        {t("hero.headline")}
                    </motion.h1>
                    <motion.p variants={item} className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                        {t("hero.subheadline")}
                    </motion.p>
                    <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button size="lg" className="rounded-full shadow-lg hover:shadow-primary/25 transition-all">{t("hero.ctaPrimary")}</Button>
                        <Button size="lg" variant="outline" className="rounded-full backdrop-blur-sm bg-background/50">{t("hero.ctaSecondary")}</Button>
                    </motion.div>

                    <motion.div variants={item} className="pt-8 flex flex-row gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Download className="w-4 h-4 text-primary" />
                            <span>{t("hero.bullets.instant")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <InfinityIcon className="w-4 h-4 text-primary" />
                            <span>{t("hero.bullets.lifetime")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sliders className="w-4 h-4 text-primary" />
                            <span>{t("hero.bullets.custom")}</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Floating Cards / Visuals */}
                <div className="relative h-[600px] hidden lg:flex items-center justify-center">
                    {/* Main Abstract Shape - maybe just a big glass card or 3D mock */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="relative z-10"
                        >
                            <div className="w-[320px] h-[450px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/20 shadow-2xl relative rotate-[-5deg] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50" />
                                {/* Mock Content */}
                                <div className="p-8 space-y-6 relative z-10">
                                    <div className="h-6 w-1/2 bg-white/20 rounded-full" />
                                    <div className="h-40 w-full bg-white/10 rounded-2xl border border-white/5" />
                                    <div className="space-y-3">
                                        <div className="h-4 w-full bg-white/10 rounded-full" />
                                        <div className="h-4 w-5/6 bg-white/10 rounded-full" />
                                        <div className="h-4 w-4/6 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="pt-4">
                                        <div className="h-10 w-full bg-primary/20 rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Mini Cards */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[20%] right-[10%] z-20"
                        >
                            <Card className="p-4 flex items-center gap-3 w-48 border-white/20 bg-background/60">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                    <span className="text-xl">✓</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Habit Tracker</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Streak: 45 days</p>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-[20%] left-[10%] z-20"
                        >
                            <Card className="p-4 flex items-center gap-3 w-48 border-white/20 bg-background/60">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                    <span className="text-xl">📚</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Reading</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Daily Goal Met</p>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
