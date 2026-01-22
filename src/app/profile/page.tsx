"use client"

import React from "react"
import { useGamification, StoreItem } from "@/context/GamificationContext"
import { motion } from "framer-motion"
import { Shield, Trophy, Check, User } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

export default function ProfilePage() {
    const {
        level,
        xp,
        achievements,
        inventory,
        equippedFrame,
        equipFrame,
        storeItems
    } = useGamification()

    // Filter store items to only show owned frames
    const ownedFrames = storeItems.filter(
        item => item.type === "frame" && inventory.includes(item.id)
    )

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                        {/* Profile Picture with Frame */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                            {/* User Avatar Placeholder */}
                            <div className="absolute inset-2 bg-secondary rounded-full overflow-hidden flex items-center justify-center">
                                <User className="w-16 h-16 text-muted-foreground" />
                            </div>

                            {/* Equipped Frame */}
                            {equippedFrame && (
                                <div className="absolute inset-0 pointer-events-none z-10 w-[140%] h-[140%] top-[-20%] left-[-20%]">
                                    {(() => {
                                        const frame = storeItems.find(i => i.id === equippedFrame);
                                        return frame?.image ? (
                                            <Image
                                                src={frame.image}
                                                alt="Equipped Frame"
                                                fill
                                                className={cn("object-contain",
                                                    frame.visualEffect === "shine" && "animate-pulse",
                                                    frame.visualEffect === "pulse" && "animate-pulse"
                                                )}
                                            />
                                        ) : null;
                                    })()}
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="text-center md:text-left space-y-2">
                            <h1 className="text-4xl font-serif font-bold">Stoic Warrior</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm">
                                    Level {level}
                                </div>
                                <div className="px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground font-medium text-sm">
                                    {xp} XP
                                </div>
                            </div>
                            <p className="text-muted-foreground max-w-md">
                                "The happiness of your life depends upon the quality of your thoughts."
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Frames Inventory */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="w-5 h-5 text-primary" />
                                <h2 className="text-2xl font-serif font-bold">Frame Collection</h2>
                            </div>

                            {ownedFrames.length === 0 ? (
                                <div className="p-8 border border-dashed rounded-xl text-center text-muted-foreground">
                                    You don't own any frames yet. Visit the Tavern to buy some!
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {ownedFrames.map((frame) => (
                                        <div
                                            key={frame.id}
                                            className={cn(
                                                "relative aspect-square rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-secondary/50",
                                                equippedFrame === frame.id
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border bg-card"
                                            )}
                                            onClick={() => equipFrame(frame.id)}
                                        >
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                {frame.image && (
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={frame.image}
                                                            alt={frame.name}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs font-bold text-center truncate w-full">{frame.name}</p>

                                            {equippedFrame === frame.id && (
                                                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                                    Equipped
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Achievements */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Trophy className="w-5 h-5 text-[#FFD700]" />
                                <h2 className="text-2xl font-serif font-bold">Achievements</h2>
                            </div>

                            <div className="space-y-3">
                                {achievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className={cn(
                                            "flex items-start gap-4 p-4 rounded-xl border transition-all",
                                            achievement.completed
                                                ? "bg-secondary/30 border-primary/20"
                                                : "bg-muted/30 border-transparent opacity-60"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                            achievement.completed ? "bg-[#FFD700]/10 text-[#FFD700]" : "bg-muted text-muted-foreground"
                                        )}>
                                            {achievement.completed ? <Check className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className={cn("font-bold", achievement.completed ? "text-foreground" : "text-muted-foreground")}>
                                                {achievement.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{achievement.description}</p>

                                            {!achievement.completed && (
                                                <div className="mt-2 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary/50 transition-all duration-500"
                                                        style={{ width: `${Math.min(100, (achievement.progress / achievement.target) * 100)}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            {achievement.completed && (
                                                <div className="text-xs font-bold text-primary flex flex-col items-end">
                                                    <span>+{achievement.rewardXp} XP</span>
                                                    <span>+{achievement.rewardOro} Oro</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
