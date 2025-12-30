"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
// import { toast } from "sonner" 

// Challenge Interface
export interface Challenge {
    id: string
    title: string
    xpReward: number
    completed: boolean
    type: "daily" | "one-time"
}

// Gamification Context Interface
interface GamificationContextType {
    xp: number
    level: number
    streak: number
    challenges: Challenge[]
    referralCode: string
    referrals: number
    addXp: (amount: number, reason?: string) => void
    completeChallenge: (id: string) => void
    checkDailyLogin: () => void
    addReferral: () => void
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: React.ReactNode }) {
    const [xp, setXp] = useState(0)
    const [streak, setStreak] = useState(0)
    const [lastLogin, setLastLogin] = useState<string | null>(null)
    const [referrals, setReferrals] = useState(0)

    // Derived state for level (Simple formula: Level = 1 + floor(XP / 100))
    const level = 1 + Math.floor(xp / 100)

    // Daily Challenges Mock Data
    const [challenges, setChallenges] = useState<Challenge[]>([
        { id: "c1", title: "Do 10 Pushups", xpReward: 50, completed: false, type: "daily" },
        { id: "c2", title: "Drink 2L Water", xpReward: 30, completed: false, type: "daily" },
        { id: "c3", title: "Read 5 Pages", xpReward: 40, completed: false, type: "daily" },
        { id: "c4", title: "Meditate 5 Mins", xpReward: 40, completed: false, type: "daily" },
    ])

    // Generate a random referral code for the user
    const [referralCode] = useState("STOIC-" + Math.floor(1000 + Math.random() * 9000))

    // Load state from local storage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("howstoic_gamification")
        if (savedData) {
            const parsed = JSON.parse(savedData)
            setXp(parsed.xp || 0)
            setStreak(parsed.streak || 0)
            setLastLogin(parsed.lastLogin || null)

            // Allow resetting challenges if it's a new day, but for now just load them
            if (parsed.challenges) setChallenges(parsed.challenges)

            setReferrals(parsed.referrals || 0)
        }
    }, [])

    // Save state whenever it changes
    useEffect(() => {
        localStorage.setItem("howstoic_gamification", JSON.stringify({
            xp,
            streak,
            lastLogin,
            challenges,
            referrals
        }))
    }, [xp, streak, lastLogin, challenges, referrals])

    const addXp = (amount: number, reason?: string) => {
        setXp(prev => prev + amount)
        // Ideally show a toast here
        console.log(`Earned ${amount} XP: ${reason}`)
    }

    const completeChallenge = (id: string) => {
        setChallenges(prev => prev.map(c => {
            if (c.id === id && !c.completed) {
                addXp(c.xpReward, `Completed challenge: ${c.title}`)
                return { ...c, completed: true }
            }
            return c
        }))
    }

    const checkDailyLogin = () => {
        const today = new Date().toDateString()
        if (lastLogin !== today) {
            // It's a new day
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)

            if (lastLogin === yesterday.toDateString()) {
                // Consecutive day
                setStreak(prev => prev + 1)
                addXp(20 + (streak * 5), "Daily Streak Bonus")
            } else {
                // Streak broken or first time
                setStreak(1)
                addXp(20, "Daily Login")
            }
            setLastLogin(today)

            // Reset daily challenges
            setChallenges(prev => prev.map(c => ({ ...c, completed: false })))
        }
    }

    const addReferral = () => {
        setReferrals(prev => prev + 1)
        addXp(200, "Friend Referral Bonus")
    }

    return (
        <GamificationContext.Provider value={{
            xp,
            level,
            streak,
            challenges,
            referralCode,
            referrals,
            addXp,
            completeChallenge,
            checkDailyLogin,
            addReferral
        }}>
            {children}
        </GamificationContext.Provider>
    )
}

export function useGamification() {
    const context = useContext(GamificationContext)
    if (context === undefined) {
        throw new Error("useGamification must be used within a GamificationProvider")
    }
    return context
}
