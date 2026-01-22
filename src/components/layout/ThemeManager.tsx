"use client"

import { useEffect } from "react"
import { useGamification } from "@/context/GamificationContext"

export function ThemeManager() {
    const { equippedTheme } = useGamification()

    useEffect(() => {
        const root = document.documentElement

        // Remove existing theme classes (any class starting with theme-)
        const classes = Array.from(root.classList)
        classes.forEach(cls => {
            if (cls.startsWith("theme-")) {
                root.classList.remove(cls)
            }
        })

        console.log("Equipping theme:", equippedTheme)

        // Apply new theme if exists
        if (equippedTheme) {
            // theme_spartan -> theme-spartan
            const className = equippedTheme.replace("_", "-")
            root.classList.add(className)
            console.log("Added class:", className)
        }
    }, [equippedTheme])

    return null
}
