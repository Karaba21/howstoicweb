"use client"
import { useI18n } from "@/context/I18nContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { BookOpen, Mic, FileText, ArrowRight } from "lucide-react"

export function Library() {
    const { t } = useI18n()

    const resources = [
        {
            type: "Article",
            icon: <FileText className="w-5 h-5" />,
            title: "Stoicism in Modern Times",
            readTime: "5 min read",
            category: "Philosophy"
        },
        {
            type: "Audio",
            icon: <Mic className="w-5 h-5" />,
            title: "Morning Visualization",
            readTime: "10 min audio",
            category: "Meditation"
        },
        {
            type: "Template",
            icon: <BookOpen className="w-5 h-5" />,
            title: "Weekly Review PDF",
            readTime: "Download",
            category: "Productivity"
        }
    ]

    return (
        <section id="library" className="py-24 bg-secondary/5 relative">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">{t("library.title")}</h2>
                        <p className="text-muted-foreground max-w-xl">Curated content to help you learn, grow, and master your mind.</p>
                    </div>
                    <Button variant="ghost" className="hidden md:flex gap-2">
                        View All <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {resources.map((res, i) => (
                        <Card key={i} className="group cursor-pointer hover:border-primary/50">
                            <div className="h-40 bg-muted relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                    <span className="text-white text-xs font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/10 uppercase tracking-wider">
                                        {res.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                    {res.icon}
                                    <span>{res.type}</span>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span>{res.readTime}</span>
                                </div>
                                <h3 className="font-serif font-bold text-xl group-hover:text-primary transition-colors">{res.title}</h3>
                                <Button size="sm" variant="secondary" className="w-full">
                                    {t("library.view")}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
