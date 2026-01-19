"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

const translations = {
    es: {
        nav: {
            home: "Inicio",
            products: "Productos",
            packs: "Packs",
            community: "Comunidad",
            library: "Biblioteca",

        },
        hero: {
            headline: "Forja tu productividad",
            subheadline: "Herramientas, planners y productos digitales para el día a día.",
            ctaPrimary: "Quiero ser mejor",
            ctaSecondary: "Ver productos",
            bullets: {
                instant: "Descarga inmediata",
                lifetime: "Acceso de por vida",
                custom: "Personalizables",
            }
        },
        products: {
            title: "Empieza a mejorar hoy",
            filter: {
                all: "Todos",
                habits: "Hábitos",
                reading: "Lectura",
                fitness: "Fitness",
                finance: "Finanzas",
                mindset: "Mindset",
            },
            addToCart: "Agregar al carrito",
        },
        packs: {
            title: "Construye hábitos de éxito",
        },
        community: {
            title: "Comunidad y desafíos",
            cta: "Unirme a la comunidad",
        },
        library: {
            title: "Recursos para ti",
            view: "Ver",
        },

        cart: {
            title: "Carrito",
            empty: "Tu carrito está vacío",
            total: "Subtotal",
            checkout: "Comprar",
        },
    },
    en: {
        nav: {
            home: "Home",
            products: "Products",
            packs: "Packs",
            community: "Community",
            library: "Library",

        },
        hero: {
            headline: "Forge your productivity",
            subheadline: "Tools, planners and digital products for your daily life.",
            ctaPrimary: "I want to improve",
            ctaSecondary: "View products",
            bullets: {
                instant: "Instant download",
                lifetime: "Lifetime access",
                custom: "Customizable",
            }
        },
        products: {
            title: "Start improving today",
            filter: {
                all: "All",
                habits: "Habits",
                reading: "Reading",
                fitness: "Fitness",
                finance: "Finance",
                mindset: "Mindset",
            },
            addToCart: "Add to cart",
        },
        packs: {
            title: "Build successful habits",
        },
        community: {
            title: "Community & Challenges",
            cta: "Join the community",
        },
        library: {
            title: "Resources for you",
            view: "View",
        },

        cart: {
            title: "Cart",
            empty: "Your cart is empty",
            total: "Subtotal",
            checkout: "Checkout",
        },
    },
}

type Locale = "es" | "en"
type Translations = typeof translations.es

interface I18nContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (path: string) => string
    translations: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("es")

    const t = (path: string) => {
        const keys = path.split(".")
        let current: any = translations[locale]
        for (const key of keys) {
            if (current === undefined || current[key] === undefined) return path
            current = current[key]
        }
        return current as string
    }

    return (
        <I18nContext.Provider value={{ locale, setLocale, t, translations: translations[locale] }}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)
    if (context === undefined) {
        throw new Error("useI18n must be used within an I18nProvider")
    }
    return context
}
