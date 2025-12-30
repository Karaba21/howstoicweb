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

// Store Item Interface
export interface StoreItem {
    id: string
    name: string
    description: string
    price: number
    type: "frame" | "reward"
    image?: string
    color?: string // CSS Hue rotation or filter class
    visualEffect?: "shine" | "pulse" | "metallic" | "void"
}

// Achievement Interface
export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    progress: number
    target: number
    completed: boolean
    rewardOro: number
    rewardXp: number
}

// Gamification Context Interface
interface GamificationContextType {
    xp: number
    level: number
    streak: number
    challenges: Challenge[]
    referralCode: string
    referrals: number
    oro: number
    inventory: string[]
    equippedFrame: string | null
    totalLogins: number
    totalChallengesCompleted: number
    achievements: Achievement[]
    addXp: (amount: number, reason?: string) => void
    completeChallenge: (id: string) => void
    checkDailyLogin: () => void
    addReferral: () => void
    buyItem: (item: StoreItem) => boolean
    equipFrame: (frameId: string) => void
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: React.ReactNode }) {
    const [xp, setXp] = useState(0)
    const [streak, setStreak] = useState(0)
    const [lastLogin, setLastLogin] = useState<string | null>(null)
    const [referrals, setReferrals] = useState(0)
    const [oro, setOro] = useState(0)
    const [inventory, setInventory] = useState<string[]>([])
    const [equippedFrame, setEquippedFrame] = useState<string | null>(null)
    const [totalLogins, setTotalLogins] = useState(0)
    const [totalChallengesCompleted, setTotalChallengesCompleted] = useState(0)

    // Initial Achievements Data
    const [achievements, setAchievements] = useState<Achievement[]>([
        { id: "a_novice", title: "Stoic Novice", description: "Complete your first daily challenge.", icon: "Star", progress: 0, target: 1, completed: false, rewardOro: 50, rewardXp: 100 },
        { id: "a_streak_3", title: "Consistency is Key", description: "Reach a 3-day streak.", icon: "Flame", progress: 0, target: 3, completed: false, rewardOro: 100, rewardXp: 200 },
        { id: "a_streak_7", title: "Dedicated Disciple", description: "Reach a 7-day streak.", icon: "Flame", progress: 0, target: 7, completed: false, rewardOro: 250, rewardXp: 500 },
        { id: "a_streak_10", title: "Iron Will", description: "Reach a 10-day streak.", icon: "Flame", progress: 0, target: 10, completed: false, rewardOro: 500, rewardXp: 1000 },
        { id: "a_challenges_10", title: "Practice Makes Perfect", description: "Complete 10 Daily Challenges total.", icon: "CheckCircle2", progress: 0, target: 10, completed: false, rewardOro: 200, rewardXp: 400 },
        { id: "a_challenges_50", title: "Master of Discipline", description: "Complete 50 Daily Challenges total.", icon: "Trophy", progress: 0, target: 50, completed: false, rewardOro: 1000, rewardXp: 2000 },
        { id: "a_oro_1000", title: "Wealthy Philosopher", description: "Hold 1,000 Oro at once.", icon: "Coins", progress: 0, target: 1000, completed: false, rewardOro: 100, rewardXp: 500 }, // Bonus for saving
        { id: "a_collector_3", title: "Collector", description: "Own 3 distinct frames.", icon: "Images", progress: 0, target: 3, completed: false, rewardOro: 300, rewardXp: 600 },
    ])

    // Derived state for level (Simple formula: Level = 1 + floor(XP / 100))
    // We track previous level to detect level up
    const [currentLevel, setCurrentLevel] = useState(1)

    // Calculate level based on XP
    const calculatedLevel = 1 + Math.floor(xp / 100)

    // Effect to handle level up
    useEffect(() => {
        if (calculatedLevel > currentLevel) {
            const levelsGained = calculatedLevel - currentLevel
            const oroReward = levelsGained * 10 // 10 Oro per level
            setOro(prev => prev + oroReward)
            setCurrentLevel(calculatedLevel)
            console.log(`Level Up! Gained ${oroReward} Oro!`)
            // Ideally show a toast here
        }
    }, [calculatedLevel, currentLevel])

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
            setOro(parsed.oro || 0)
            setInventory(parsed.inventory || [])
            setEquippedFrame(parsed.equippedFrame || null)
            setTotalLogins(parsed.totalLogins || 0)
            setTotalChallengesCompleted(parsed.totalChallengesCompleted || 0)
            if (parsed.achievements) {
                // Merge loaded achievements with current definitions to ensure new achievements appear
                setAchievements(prev => {
                    const loaded = parsed.achievements as Achievement[]
                    return prev.map(p => {
                        const found = loaded.find(l => l.id === p.id)
                        return found ? found : p
                    })
                })
            }

            // Allow resetting challenges if it's a new day, but for now just load them
            if (parsed.challenges) setChallenges(parsed.challenges)

            setReferrals(parsed.referrals || 0)

            // Sync current level
            const loadedLevel = 1 + Math.floor((parsed.xp || 0) / 100)
            setCurrentLevel(loadedLevel)
        }
    }, [])

    // Save state whenever it changes
    useEffect(() => {
        localStorage.setItem("howstoic_gamification", JSON.stringify({
            xp,
            streak,
            lastLogin,
            challenges,
            referrals,
            oro,
            inventory,
            equippedFrame,
            totalLogins,
            totalChallengesCompleted,
            achievements
        }))
    }, [xp, streak, lastLogin, challenges, referrals, oro, inventory, equippedFrame, totalLogins, totalChallengesCompleted, achievements])

    const addXp = (amount: number, reason?: string) => {
        setXp(prev => prev + amount)
        // Ideally show a toast here
        console.log(`Earned ${amount} XP: ${reason}`)
    }

    const checkAchievements = (currentTotalChallenges: number, currentStreak: number, currentOro: number, currentFrames: number) => {
        setAchievements(prev => prev.map(ach => {
            if (ach.completed) return ach

            let newProgress = ach.progress
            let newlyCompleted = false

            // Check based on achievement ID patterns
            if (ach.id === "a_novice" && currentTotalChallenges >= 1) { newProgress = 1; newlyCompleted = true }
            else if (ach.id === "a_challenges_10" && currentTotalChallenges >= 10) { newProgress = currentTotalChallenges; newlyCompleted = true }
            else if (ach.id === "a_challenges_50" && currentTotalChallenges >= 50) { newProgress = currentTotalChallenges; newlyCompleted = true }
            else if (ach.id === "a_streak_3") { newProgress = currentStreak; if (currentStreak >= 3) newlyCompleted = true }
            else if (ach.id === "a_streak_7") { newProgress = currentStreak; if (currentStreak >= 7) newlyCompleted = true }
            else if (ach.id === "a_streak_10") { newProgress = currentStreak; if (currentStreak >= 10) newlyCompleted = true }
            else if (ach.id === "a_oro_1000") { newProgress = currentOro; if (currentOro >= 1000) newlyCompleted = true }
            else if (ach.id === "a_collector_3") { newProgress = currentFrames; if (currentFrames >= 3) newlyCompleted = true }

            // Allow progress updates for tracking bars even if not completed
            if (ach.id.includes("challenges")) newProgress = currentTotalChallenges
            if (ach.id.includes("streak")) newProgress = currentStreak
            if (ach.id.includes("oro")) newProgress = currentOro
            if (ach.id.includes("collector")) newProgress = currentFrames

            if (newlyCompleted) {
                addXp(ach.rewardXp, `Achievement Unlocked: ${ach.title}`)
                setOro(o => o + ach.rewardOro)
                console.log(`Unlocked Achievement: ${ach.title}`)
            }

            return { ...ach, progress: newProgress, completed: ach.completed || newlyCompleted }
        }))
    }

    const completeChallenge = (id: string) => {
        setChallenges(prev => {
            const challenge = prev.find(c => c.id === id)
            if (challenge && !challenge.completed) {
                const newTotal = totalChallengesCompleted + 1
                setTotalChallengesCompleted(newTotal) // Update state

                // Check achievements
                checkAchievements(newTotal, streak, oro, inventory.filter(i => i.startsWith('frame')).length)

                addXp(challenge.xpReward, `Completed challenge: ${challenge.title}`)
                return prev.map(c => c.id === id ? { ...c, completed: true } : c)
            }
            return prev
        })
    }

    const checkDailyLogin = () => {
        const today = new Date().toDateString()
        if (lastLogin !== today) {
            // It's a new day
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)

            let newStreak = streak

            if (lastLogin === yesterday.toDateString()) {
                // Consecutive day
                newStreak = streak + 1
                setStreak(newStreak)
                addXp(20 + (newStreak * 5), "Daily Streak Bonus")
            } else {
                // Streak broken or first time
                newStreak = 1
                setStreak(1)
                addXp(20, "Daily Login")
            }

            setLastLogin(today)
            setTotalLogins(prev => prev + 1)

            // Check achievements
            checkAchievements(totalChallengesCompleted, newStreak, oro, inventory.filter(i => i.startsWith('frame')).length)

            // Reset daily challenges
            setChallenges(prev => prev.map(c => ({ ...c, completed: false })))
        }
    }

    const addReferral = () => {
        setReferrals(prev => prev + 1)
        addXp(200, "Friend Referral Bonus")
    }

    const buyItem = (item: StoreItem): boolean => {
        if (oro >= item.price) {
            setOro(prev => prev - item.price)
            setInventory(prev => [...prev, item.id])
            console.log(`Bought ${item.name} for ${item.price} Oro`)
            return true
        }
        console.log("Not enough Oro")
        return false
    }

    const equipFrame = (frameId: string) => {
        if (inventory.includes(frameId)) {
            setEquippedFrame(frameId)
        }
    }

    return (
        <GamificationContext.Provider value={{
            xp,
            level: calculatedLevel,
            streak,
            challenges,
            referralCode,
            referrals,
            oro,
            inventory,
            equippedFrame,
            totalLogins,
            totalChallengesCompleted,
            achievements,
            addXp,
            completeChallenge,
            checkDailyLogin,
            addReferral,
            buyItem,
            equipFrame
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
