"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
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
    type: "frame" | "reward" | "powerup" | "theme"
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
    equippedTheme: string | null
    totalLogins: number
    totalChallengesCompleted: number
    achievements: Achievement[]
    addXp: (amount: number, reason?: string) => void
    completeChallenge: (id: string) => void
    checkDailyLogin: () => void
    addReferral: () => void
    buyItem: (item: StoreItem) => Promise<boolean>
    equipFrame: (frameId: string) => void
    equipTheme: (themeId: string) => void
    addOro: (amount: number) => void
    storeItems: StoreItem[]
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export const AVAILABLE_STORE_ITEMS: StoreItem[] = [
    {
        id: "frame_gold_simple",
        name: "Classic Gold",
        description: "A simple, elegant ring of pure gold.",
        price: 100,
        type: "frame",
        image: "/border_gold_simple_1768089887619-removebg-preview.png",
        visualEffect: "metallic"
    },
    {
        id: "frame_greek_laurel",
        name: "Emperor's Laurel",
        description: "A symbol of victory and status in ancient Greece.",
        price: 500,
        type: "frame",
        image: "/border_greek_laurel_1768089900249-removebg-preview.png",
        visualEffect: "shine"
    },
    {
        id: "frame_ethereal_blue",
        name: "Stoic Void",
        description: "A glowing neon border from the future.",
        price: 1000,
        type: "frame",
        image: "/border_ethereal_blue_removebg_v2.png",
        visualEffect: "pulse"
    },
    {
        id: "frame_stoic_fire",
        name: "Inner Fire",
        description: "Unquenchable will, manifested as flames.",
        price: 2500,
        type: "frame",
        image: "/border_stoic_fire_1768090002141-removebg-preview.png",
        visualEffect: "pulse"
    },
    {
        id: "frame_marble_gold",
        name: "Pantheon",
        description: "Heavy marble and gold, fit for the gods.",
        price: 5000,
        type: "frame",
        image: "/border_marble_gold_elite_1768090015774-removebg-preview.png",
        visualEffect: "metallic"
    },
    {
        id: "frame_cosmic_void",
        name: "Cosmic Infinite",
        description: "Stare into the void, and let it stare back.",
        price: 10000,
        type: "frame",
        image: "/border_cosmic_void_1768090028445-removebg-preview.png",
        visualEffect: "void"
    },
    {
        id: "streak_freeze",
        name: "Streak Freeze",
        description: "Miss a day without losing your streak.",
        price: 500,
        type: "powerup",
        // Using a placeholder icon/image or we can reuse coins for now or a specific one if available
        // Since I don't have a specific image, I will omit image and let TavernPage fallback to icon
        visualEffect: "shine"
    },
    {
        id: "theme_spartan",
        name: "Spartan Mode",
        description: "A dark, blood-red theme forged in battle. Intimidating and focused.",
        price: 25000,
        type: "theme",
        visualEffect: "metallic"
    },
    {
        id: "theme_marble",
        name: "Marble Mode",
        description: "Pure white marble and gold. Clean, divine, and elite.",
        price: 25000,
        type: "theme",
        visualEffect: "shine"
    },
    {
        id: "theme_void",
        name: "Void Mode",
        description: "Deep space darkness with neon cyan accents. For the futuristic stoic.",
        price: 25000,
        type: "theme",
        visualEffect: "void"
    },
    {
        id: "theme_royal",
        name: "Royal Mode",
        description: "Deep purple and gold. Representing wealth and wisdom.",
        price: 25000,
        type: "theme",
        visualEffect: "shine"
    },
    {
        id: "theme_forest",
        name: "Forest Mode",
        description: "Sage greens and earth tones. Grounded in nature.",
        price: 25000,
        type: "theme",
        visualEffect: "metallic"
    },
    {
        id: "theme_sunset",
        name: "Sunset Mode",
        description: "Warm oranges and dusky purples. Memento Mori.",
        price: 25000,
        type: "theme",
        visualEffect: "pulse"
    }
]

export function GamificationProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [xp, setXp] = useState(0)
    const [streak, setStreak] = useState(0)
    const [lastLogin, setLastLogin] = useState<string | null>(null)
    const [referrals, setReferrals] = useState(0)
    const [oro, setOro] = useState(0)
    const [inventory, setInventory] = useState<string[]>([])
    const [equippedFrame, setEquippedFrame] = useState<string | null>(null)
    const [equippedTheme, setEquippedTheme] = useState<string | null>(null)
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
        { id: "a_oro_1000", title: "Wealthy Philosopher", description: "Hold 1,000 Oro at once.", icon: "Coins", progress: 0, target: 1000, completed: false, rewardOro: 100, rewardXp: 500 },
        { id: "a_collector_3", title: "Collector", description: "Own 3 distinct frames.", icon: "Images", progress: 0, target: 3, completed: false, rewardOro: 300, rewardXp: 600 },
    ])

    const [currentLevel, setCurrentLevel] = useState(1)
    const calculatedLevel = 1 + Math.floor(Math.sqrt(xp / 50))

    // Daily Challenges Mock Data - ideally fetch from DB too, but keeping mock for now for structure
    const [challenges, setChallenges] = useState<Challenge[]>([
        { id: "c1", title: "Do 10 Pushups", xpReward: 50, completed: false, type: "daily" },
        { id: "c2", title: "Drink 2L Water", xpReward: 30, completed: false, type: "daily" },
        { id: "c3", title: "Read 5 Pages", xpReward: 40, completed: false, type: "daily" },
        { id: "c4", title: "Meditate 5 Mins", xpReward: 40, completed: false, type: "daily" },
    ])

    const [referralCode] = useState("STOIC-" + Math.floor(1000 + Math.random() * 9000))

    // Fetch Data from Supabase
    useEffect(() => {
        if (!user) {
            // Reset state on logout
            setXp(0)
            setOro(0)
            setStreak(0)
            setInventory([])
            setEquippedFrame(null)
            setEquippedTheme(null)
            return
        }

        const fetchData = async () => {
            try {
                // 1. Fetch Profile
                const { data: profile, error: profileError } = await supabase
                    .from('users_profile')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (profile) {
                    setXp(profile.xp || 0)
                    setOro(50000) // HARDCODED FOR TESTING
                    setStreak(profile.streak || 0)
                    setLastLogin(profile.last_active_date)
                    setEquippedFrame(profile.equipped_frame)
                    setEquippedTheme(profile.equipped_theme)
                    // Level is derived from XP, but if stored: setCurrentLevel(profile.level)
                }

                // 2. Fetch Inventory
                const { data: invItems } = await supabase
                    .from('user_inventory')
                    .select('item_id')
                    .eq('user_id', user.id)

                if (invItems) {
                    setInventory(invItems.map(i => i.item_id))
                }

                // 3. Fetch User Achievements (Progress)
                const { data: userAch } = await supabase
                    .from('user_achievements')
                    .select('*')
                    .eq('user_id', user.id)

                if (userAch) {
                    setAchievements(prev => prev.map(base => {
                        const found = userAch.find(ua => ua.achievement_id === base.id)
                        return found
                            ? { ...base, progress: found.progress, completed: found.completed }
                            : base
                    }))
                }

            } catch (error) {
                console.error("Error fetching gamification data:", error)
            }
        }

        fetchData()
    }, [user])

    // Sync Level
    useEffect(() => {
        if (calculatedLevel > currentLevel) {
            setCurrentLevel(calculatedLevel)
            // If leveling up grants rewards, handle it here. 
            // NOTE: Ideally we check if this level was already reached in DB to avoid duplicate rewards on refresh.
            // For now, we assume simple client-side tracking for the session or we need 'level' in DB to be updated only when changed.
            if (user) {
                supabase.from('users_profile').update({ level: calculatedLevel }).eq('id', user.id).then()
            }
        }
    }, [calculatedLevel, currentLevel, user])


    const addXp = async (amount: number, reason?: string) => {
        // Optimistic update
        setXp(prev => prev + amount)
        console.log(`Earned ${amount} XP: ${reason}`)

        if (!user) return

        // DB Update
        await supabase.rpc('increment_xp', { x: amount, user_id: user.id }).catch(async () => {
            // Fallback if RPC missing
            const { data } = await supabase.from('users_profile').select('xp').eq('id', user.id).single()
            if (data) {
                await supabase.from('users_profile').update({ xp: data.xp + amount }).eq('id', user.id)
            }
        })
    }

    const checkAchievements = async (currentTotalChallenges: number, currentStreak: number, currentOro: number, currentFrames: number) => {
        // This function is complex: it checks rules and updates specific achievements.
        // We'll iterate and update Supabase for any CHANGED achievement.

        const nextAchievements = achievements.map(ach => {
            if (ach.completed) return ach // Already done

            let newProgress = ach.progress
            let newlyCompleted = false

            // Rules
            if (ach.id === "a_novice" && currentTotalChallenges >= 1) { newProgress = 1; newlyCompleted = true }
            else if (ach.id === "a_challenges_10" && currentTotalChallenges >= 10) { newProgress = currentTotalChallenges; newlyCompleted = true }
            else if (ach.id === "a_challenges_50" && currentTotalChallenges >= 50) { newProgress = currentTotalChallenges; newlyCompleted = true }
            else if (ach.id === "a_streak_3") { newProgress = currentStreak; if (currentStreak >= 3) newlyCompleted = true }
            else if (ach.id === "a_streak_7") { newProgress = currentStreak; if (currentStreak >= 7) newlyCompleted = true }
            else if (ach.id === "a_streak_10") { newProgress = currentStreak; if (currentStreak >= 10) newlyCompleted = true }
            else if (ach.id === "a_oro_1000") { newProgress = currentOro; if (currentOro >= 1000) newlyCompleted = true }
            else if (ach.id === "a_collector_3") { newProgress = currentFrames; if (currentFrames >= 3) newlyCompleted = true }

            // Generic progress updates
            if (ach.id.includes("challenges")) newProgress = currentTotalChallenges
            if (ach.id.includes("streak")) newProgress = currentStreak
            if (ach.id.includes("oro")) newProgress = currentOro
            if (ach.id.includes("collector")) newProgress = currentFrames

            return { ...ach, progress: newProgress, newlyCompleted }
        })

        // Identify changes
        const changed = nextAchievements.filter((ach, i) => {
            const original = achievements[i]
            return ach.progress !== original.progress || (ach.newlyCompleted && !original.completed)
        })

        if (changed.length > 0) {
            setAchievements(nextAchievements.map(a => ({ ...a, completed: a.completed || a.newlyCompleted })))

            if (!user) return

            // Push updates to Supabase
            for (const ach of changed) {
                // Upsert user_achievements
                await supabase.from('user_achievements').upsert({
                    user_id: user.id,
                    achievement_id: ach.id,
                    progress: ach.progress,
                    completed: ach.completed || ach.newlyCompleted,
                    updated_at: new Date().toISOString()
                })

                if (ach.newlyCompleted) {
                    // Give Rewards
                    addXp(ach.rewardXp, "Achievement Unlocked")
                    addOro(ach.rewardOro)
                }
            }
        }
    }

    const completeChallenge = (id: string) => {
        // Optimistic
        const challenge = challenges.find(c => c.id === id)
        if (challenge && !challenge.completed) {
            const newTotal = totalChallengesCompleted + 1
            setTotalChallengesCompleted(newTotal)

            // 1. Mark as completed in state
            setChallenges(prev => prev.map(c => c.id === id ? { ...c, completed: true } : c))

            // 2. Add XP for the challenge itself
            addXp(challenge.xpReward, `Completed challenge: ${challenge.title}`)

            // 3. Check for achievements (which might add more XP/Oro)
            checkAchievements(newTotal, streak, oro, inventory.filter(i => i.startsWith('frame')).length)
        }
    }

    const checkDailyLogin = async () => {
        if (!user) return

        const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
        // Compare with lastLogin (which we fetched as string)
        const lastDate = lastLogin ? lastLogin.split('T')[0] : null

        if (lastDate !== today) {
            // New Day
            // Calculate Streak
            let newStreak = streak
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const yesterdayStr = yesterday.toISOString().split('T')[0]

            if (lastDate === yesterdayStr) {
                // Consecutive
                newStreak = streak + 1
                addXp(20 + (newStreak * 5), "Daily Streak Bonus")
            } else {
                // Broken? Check Freeze
                const freezeIndex = inventory.indexOf("streak_freeze")
                if (freezeIndex !== -1 && streak > 0) {
                    // USE FREEZE
                    // Remove 1 freeze from DB
                    // Not easy to "delete one" if multiple rows, but assuming inventory is table of items.
                    // IMPORTANT: To simplify, I need to know the specific row ID or just delete one entry.
                    // Or updated user_inventory to be count based? The current schema is item_id row based? 
                    // users_inventory definition was: id, user_id, item_id. 
                    // So we delete one row with item_id = 'streak_freeze'.

                    const { data: freezeItem } = await supabase.from('user_inventory').select('id').eq('user_id', user.id).eq('item_id', 'streak_freeze').limit(1).single()
                    if (freezeItem) {
                        await supabase.from('user_inventory').delete().eq('id', freezeItem.id)
                        // Update local inventory
                        setInventory(prev => {
                            const idx = prev.indexOf('streak_freeze')
                            if (idx === -1) return prev
                            const n = [...prev]
                            n.splice(idx, 1)
                            return n
                        })
                        console.log("Streak Saved!")
                        newStreak = streak + 1
                        addXp(20 + (newStreak * 5), "Daily Streak Bonus (Freeze Active)")
                    } else {
                        // Fail safe
                        newStreak = 1
                        addXp(20, "Daily Login")
                    }
                } else {
                    newStreak = 1
                    addXp(20, "Daily Login")
                }
            }

            setStreak(newStreak)
            setLastLogin(new Date().toISOString())
            setTotalLogins(prev => prev + 1)

            // DB Update Profile
            await supabase.from('users_profile').update({
                streak: newStreak,
                last_active_date: new Date().toISOString(),
                // could also update total_logins if we added that field
            }).eq('id', user.id)

            checkAchievements(totalChallengesCompleted, newStreak, oro, inventory.filter(i => i.startsWith('frame')).length)

            // Reset challenges daily (local only for now as challenges logic isn't fully DB backed yet for "daily reset")
            setChallenges(prev => prev.map(c => ({ ...c, completed: false })))
        }
    }

    const addReferral = () => {
        setReferrals(prev => prev + 1)
        addXp(200, "Friend Referral Bonus")
    }

    const buyItem = async (item: StoreItem): Promise<boolean> => {
        if (oro >= item.price) {
            // Optimistic
            setOro(prev => prev - item.price)
            setInventory(prev => [...prev, item.id])

            if (user) {
                // DB Transaction-ish
                const { error } = await supabase.from('user_inventory').insert({
                    user_id: user.id,
                    item_id: item.id,
                    item_type: item.type
                })

                if (!error) {
                    await supabase.from('users_profile').update({ oro: oro - item.price }).eq('id', user.id)
                    return true
                } else {
                    // Revert on error?
                    console.error("Buy error", error)
                }
            }
            return true
        }
        return false
    }

    const equipFrame = async (frameId: string) => {
        if (inventory.includes(frameId)) {
            setEquippedFrame(frameId)
            if (user) {
                await supabase.from('users_profile').update({ equipped_frame: frameId }).eq('id', user.id)
            }
        }
    }

    const equipTheme = async (themeId: string) => {
        if (inventory.includes(themeId)) {
            setEquippedTheme(themeId)
            if (user) {
                await supabase.from('users_profile').update({ equipped_theme: themeId }).eq('id', user.id)
            }
        }
    }

    const addOro = async (amount: number) => {
        setOro(prev => prev + amount)
        if (user) {
            // Fetch fresh or just increment? simpler to fetch for safety or use RPC?
            // Assuming no huge race conditions for single user:
            const { data } = await supabase.from('users_profile').select('oro').eq('id', user.id).single()
            if (data) {
                await supabase.from('users_profile').update({ oro: (data.oro || 0) + amount }).eq('id', user.id)
            }
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
            equippedTheme,
            totalLogins,
            totalChallengesCompleted,
            achievements,
            addXp,
            completeChallenge,
            checkDailyLogin,
            addReferral,
            buyItem,
            equipFrame,
            equipTheme,
            addOro,
            storeItems: AVAILABLE_STORE_ITEMS
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
