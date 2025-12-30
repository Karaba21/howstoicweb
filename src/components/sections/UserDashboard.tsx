"use client"

import React, { useState } from "react"
import { useGamification } from "@/context/GamificationContext"
import { storeItems } from "@/data/storeItems"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { Trophy, Flame, Users, CheckCircle2, Circle, Star, Copy, Share2, Crown, User as UserIcon } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function UserDashboard() {
    const { xp, level, streak, challenges, referralCode, referrals, completeChallenge, addReferral, inventory, equippedFrame, equipFrame, oro } = useGamification()
    const [copied, setCopied] = useState(false)
    const [friendCode, setFriendCode] = useState("")

    const copyCode = () => {
        navigator.clipboard.writeText(referralCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleAddFriend = () => {
        if (friendCode.trim().length > 3) {
            addReferral()
            setFriendCode("")
        }
    }

    const xpToNextLevel = level * 100
    const progress = (xp % 100) / 100 * 100

    // Get equipped frame data
    const currentFrame = storeItems.find(i => i.id === equippedFrame)

    return (
        <section className="py-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Profile Card (New) */}
                <Card className="p-6 relative overflow-hidden border-[#FFD700]/30 md:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl -mr-10 -mt-10" />
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 mb-4">
                            {/* Avatar */}
                            <div className="absolute inset-2 bg-neutral-200 rounded-full overflow-hidden flex items-center justify-center border-2 border-white">
                                <UserIcon className="w-12 h-12 text-neutral-400" />
                            </div>

                            {/* Frame */}
                            <div className={cn(
                                "absolute inset-0 z-20 pointer-events-none rounded-full",
                                currentFrame?.visualEffect === "shine" && "effect-shine",
                                currentFrame?.visualEffect === "void" && "effect-void"
                            )} />

                            {currentFrame && currentFrame.image && (
                                <Image
                                    src={currentFrame.image}
                                    alt="Frame"
                                    fill
                                    className={cn(
                                        "object-contain z-10 scale-125",
                                        currentFrame.visualEffect === "metallic" && "effect-metallic"
                                    )}
                                    style={{ filter: currentFrame.color }}
                                />
                            )}
                        </div>

                        <h2 className="text-xl font-serif font-bold">Stoic Warrior</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold border border-[#FFD700]/30">
                                <Crown className="w-3 h-3" />
                                <span>{oro} Oro</span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                                Lvl {level}
                            </div>
                        </div>

                        {/* Inventory / Frame Selector */}
                        <div className="w-full mt-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Frames</h3>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20">
                                {inventory.filter(id => id.startsWith('frame')).length === 0 && (
                                    <p className="text-xs text-muted-foreground italic">Visit the tavern to buy frames...</p>
                                )}
                                {storeItems.filter(item => inventory.includes(item.id) && item.type === 'frame').map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => equipFrame(item.id)}
                                        className={cn(
                                            "relative w-12 h-12 rounded-full border-2 transition-all p-1 flex-shrink-0",
                                            equippedFrame === item.id
                                                ? "border-primary bg-primary/10"
                                                : "border-transparent hover:border-primary/50"
                                        )}
                                        title={item.name}
                                    >
                                        <div className={cn(
                                            "relative w-full h-full rounded-full",
                                            item.visualEffect === "shine" && "effect-shine"
                                        )}>
                                            <Image
                                                src={item.image || ""}
                                                alt={item.name}
                                                fill
                                                className={cn(
                                                    "object-contain",
                                                    item.visualEffect === "metallic" && "effect-metallic"
                                                )}
                                                style={{ filter: item.color }}
                                            />
                                        </div>
                                        {equippedFrame === item.id && (
                                            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                                                <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Existing Stats Cards wrapped in a container or modified grid */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Level Card */}
                    <Card className="p-6 relative overflow-hidden border-primary/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                                <Trophy className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Current Level</h3>
                                <span className="text-3xl font-serif font-bold">{level}</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>{xp} XP</span>
                                <span>{xpToNextLevel} XP</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Streak Card */}
                    <Card className="p-6 relative overflow-hidden border-orange-500/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/40">
                                <Flame className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Daily Streak</h3>
                                <span className="text-3xl font-serif font-bold">{streak} Days</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">Log in daily to boost your XP multiplier!</p>
                    </Card>

                    {/* Referrals Card */}
                    <Card className="p-6 relative overflow-hidden border-blue-500/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                                <Users className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Referrals</h3>
                                <span className="text-3xl font-serif font-bold">{referrals}</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">Earn 200 XP for every friend who joins.</p>
                    </Card>
                </div>
            </div>

            {/* Daily Challenges & Achievements Tab Area */}
            <div className="lg:col-span-2">
                <Card className="p-6">
                    <div className="flex items-center gap-6 mb-6 border-b border-border pb-4">
                        <h3 className="font-serif font-bold text-xl flex items-center gap-2 cursor-pointer text-primary">
                            <Star className="w-5 h-5" />
                            Daily Challenges
                        </h3>
                        <div className="h-6 w-px bg-border" />
                        <h3 className="font-serif font-bold text-xl flex items-center gap-2 text-foreground/50">
                            <Trophy className="w-5 h-5" />
                            Your Journey
                        </h3>
                    </div>

                    {/* Daily Challenges List */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Today's Tasks</h4>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">Resets in 12h</span>
                        </div>
                        {challenges.map((challenge) => (
                            <div
                                key={challenge.id}
                                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${challenge.completed
                                    ? "bg-primary/10 border-primary/20"
                                    : "bg-secondary/20 border-border"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => completeChallenge(challenge.id)}
                                        disabled={challenge.completed}
                                        className={`transition-transform active:scale-95 ${challenge.completed ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {challenge.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                                    </button>
                                    <div>
                                        <p className={`font-medium ${challenge.completed ? "line-through text-muted-foreground" : ""}`}>
                                            {challenge.title}
                                        </p>
                                        <span className="text-xs text-primary font-bold">+{challenge.xpReward} XP</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Achievements List */}
                    <div>
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Milestones & Achievements</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {useGamification().achievements?.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={cn(
                                        "relative p-4 rounded-lg border transition-all overflow-hidden group",
                                        achievement.completed
                                            ? "bg-gradient-to-br from-[#FFD700]/10 to-transparent border-[#FFD700]/30"
                                            : "bg-secondary/10 border-border/50 grayscale opacity-80"
                                    )}
                                >
                                    {achievement.completed && <div className="absolute inset-0 bg-[#FFD700]/5 group-hover:bg-[#FFD700]/10 transition-colors" />}

                                    <div className="flex justify-between items-start mb-2 relative z-10">
                                        <div className="bg-background p-2 rounded-full border border-border shadow-sm">
                                            {achievement.icon === 'Flame' && <Flame className={cn("w-5 h-5", achievement.completed ? "text-orange-500" : "text-muted-foreground")} />}
                                            {achievement.icon === 'Star' && <Star className={cn("w-5 h-5", achievement.completed ? "text-[#FFD700]" : "text-muted-foreground")} />}
                                            {achievement.icon === 'Trophy' && <Trophy className={cn("w-5 h-5", achievement.completed ? "text-[#FFD700]" : "text-muted-foreground")} />}
                                            {achievement.icon === 'CheckCircle2' && <CheckCircle2 className={cn("w-5 h-5", achievement.completed ? "text-green-500" : "text-muted-foreground")} />}
                                            {achievement.icon === 'Coins' && <div className={cn("w-5 h-5 font-bold flex items-center justify-center", achievement.completed ? "text-[#FFD700]" : "text-muted-foreground")}>$</div>}
                                            {!['Flame', 'Star', 'Trophy', 'CheckCircle2', 'Coins'].includes(achievement.icon) && <Star className="w-5 h-5 text-muted-foreground" />}
                                        </div>
                                        {achievement.completed ? (
                                            <span className="text-[10px] font-bold uppercase bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Completed</span>
                                        ) : (
                                            <span className="text-[10px] font-bold uppercase bg-secondary text-muted-foreground px-2 py-1 rounded-full">
                                                {Math.min(achievement.progress, achievement.target)} / {achievement.target}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="font-bold font-serif text-lg mb-1 relative z-10">{achievement.title}</h4>
                                    <p className="text-xs text-muted-foreground mb-3 h-8 relative z-10">{achievement.description}</p>

                                    {/* Progress Bar */}
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden relative z-10">
                                        <motion.div
                                            className={cn("h-full rounded-full", achievement.completed ? "bg-[#FFD700]" : "bg-primary/50")}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
                                        />
                                    </div>

                                    <div className="mt-2 text-xs flex gap-2 font-mono text-muted-foreground relative z-10">
                                        <span>+{achievement.rewardOro} Oro</span>
                                        <span>•</span>
                                        <span>+{achievement.rewardXp} XP</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Referral System */}
            <div className="lg:col-span-2">
                <Card className="p-6">
                    <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-blue-500" />
                        Invite Friends
                    </h3>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Your Unique Code (Share this!)</label>
                            <div className="flex gap-2">
                                <div className="flex-1 bg-secondary p-3 rounded-lg font-mono font-bold tracking-wider text-center border border-border">
                                    {referralCode}
                                </div>
                                <Button size="icon" variant="outline" onClick={copyCode}>
                                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">OR</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Enter Friend's Code</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={friendCode}
                                    onChange={(e) => setFriendCode(e.target.value)}
                                    placeholder="friend-code-123"
                                    className="flex-1 bg-secondary/50 border border-border rounded-lg px-4 outline-none focus:ring-2 ring-primary/20 transition-all"
                                />
                                <Button onClick={handleAddFriend} variant="secondary">
                                    Redeem
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Enter a friend's code to grant both of you a bonus.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
