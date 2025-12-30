"use client"

import React, { useState } from "react"
import { useGamification } from "@/context/GamificationContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { Trophy, Flame, Users, CheckCircle2, Circle, Star, Copy, Share2 } from "lucide-react"

export function UserDashboard() {
    const { xp, level, streak, challenges, referralCode, referrals, completeChallenge, addReferral } = useGamification()
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

    return (
        <section className="py-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Daily Challenges */}
                <Card className="p-6">
                    <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary" />
                        Daily Challenges
                    </h3>
                    <div className="space-y-4">
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
                </Card>

                {/* Referral System */}
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
