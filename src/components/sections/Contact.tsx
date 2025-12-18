"use client"
import { useI18n } from "@/context/I18nContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Mail, Instagram, Twitter } from "lucide-react"

export function Contact() {
    const { t } = useI18n()

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-serif font-bold tracking-tight mb-4">{t("contact.title")}</h2>
                            <p className="text-muted-foreground">Have questions? Want to collaborate? Reach out to us.</p>
                        </div>

                        <div className="space-y-4">
                            <a href="mailto:hello@howstoic.com" className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border/50">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Email Us</p>
                                    <p className="text-muted-foreground text-sm">hello@howstoic.com</p>
                                </div>
                            </a>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <Card className="p-8 backdrop-blur-xl bg-background/40">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("contact.name")}</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("contact.email")}</label>
                                <input type="email" className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("contact.message")}</label>
                                <textarea rows={4} className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans resize-none" placeholder="Your message..." />
                            </div>
                            <Button className="w-full" size="lg">{t("contact.send")}</Button>
                        </form>
                    </Card>
                </div>
            </div>
        </section>
    )
}
