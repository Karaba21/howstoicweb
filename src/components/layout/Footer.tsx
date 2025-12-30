"use client"
import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/context/I18nContext"

export function Footer() {
    const { t } = useI18n()

    const links = [
        { label: t("nav.home"), href: "#hero" },
        { label: t("nav.products"), href: "#products" },
        { label: t("nav.packs"), href: "#packs" },
        { label: t("nav.community"), href: "#community" },
        { label: t("nav.library"), href: "#library" },
        { label: t("nav.contact"), href: "#contact" },
    ]

    return (
        <footer className="bg-secondary/20 border-t border-border/50 py-12 backdrop-blur-3xl mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/logo2.png"
                                    alt="HowStoic Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-serif font-bold tracking-tight text-primary">HOWSTOIC</span>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-xs">{t("hero.subheadline")}</p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {links.map(link => (
                                <li key={link.href}><a href={link.href} className="hover:text-primary transition-colors cursor-pointer">{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border/50 pt-8 text-center text-xs text-muted-foreground">
                    <p>HowStoic © 2025. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
