"use client"
import { useI18n } from "@/context/I18nContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Trophy, Flame, Users, ArrowRight } from "lucide-react"

export function Community() {
    const { t } = useI18n()

    const challenges = [
        {
            title: "Early Riser Streak",
            icon: <Flame className="w-6 h-6 text-orange-500" />,
            progress: 80,
            desc: "Wake up at 5AM for 30 days"
        },
        {
            title: "Deep Work Master",
            icon: <Trophy className="w-6 h-6 text-yellow-500" />,
            progress: 45,
            desc: "Complete 100 hours of deep work"
        },
        {
            title: "Community Helper",
            icon: <Users className="w-6 h-6 text-blue-500" />,
            progress: 20,
            desc: "Reply to 50 community posts"
        }
    ]

    return (
        <section id="community" className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{t("community.title")}</h2>
                        <p className="text-xl text-muted-foreground">
                            Join thousands of modern stoics improving their lives daily. Compete in challenges, share your journey, and stay accountable.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-bold">
                                        U{i}
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                                    +2k
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="font-bold">2,500+ Members</span>
                                <span className="text-xs text-muted-foreground">Active now</span>
                            </div>
                        </div>
                        <Button size="lg" className="rounded-full shadow-lg gap-2">
                            {t("community.cta")}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <Card className="p-8 bg-secondary/10 border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Trophy className="w-48 h-48" />
                            </div>
                            <h3 className="font-serif font-bold text-2xl mb-6">Active Challenges</h3>
                            <div className="space-y-6 relative z-10">
                                {challenges.map((challenge, i) => (
                                    <div key={i} className="bg-background/40 backdrop-blur-md p-4 rounded-xl border border-white/5 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0 shadow-sm">
                                            {challenge.icon}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-bold text-sm">{challenge.title}</h4>
                                                <span className="text-xs font-bold">{challenge.progress}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${challenge.progress}%` }} />
                                            </div>
                                            <p className="text-xs text-muted-foreground">{challenge.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
