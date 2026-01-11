"use client"

import React, { useState } from "react"
import { useGamification, StoreItem } from "@/context/GamificationContext"

import { motion } from "framer-motion"
import { Coins, Lock, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function TavernPage() {
    const { oro, buyItem, inventory, equipFrame, equippedFrame, storeItems } = useGamification()
    const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null)

    const handleBuy = (item: StoreItem) => {
        if (buyItem(item)) {
            // Success feedback could go here
            setSelectedItem(null)
        }
    }

    return (
        <div className="min-h-screen bg-black relative text-white pt-24 pb-12">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/tavern-bg.png"
                    alt="Greek Tavern Background"
                    fill
                    className="object-cover opacity-40 blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#FFD700] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                            The Stoic Tavern
                        </h1>
                        <p className="text-xl text-white/80 mt-2 font-light">
                            Spend your hard-earned Oro on legendary rewards.
                        </p>
                    </motion.div>

                    {/* Oro Display */}
                    <div className="flex items-center gap-3 bg-black/60 border border-[#FFD700]/30 px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                        <Coins className="w-6 h-6 text-[#FFD700]" />
                        <span className="text-2xl font-bold text-[#FFD700]">{oro}</span>
                        <span className="text-sm text-[#FFD700]/80 uppercase tracking-widest">Oro</span>
                    </div>
                </div>

                {/* Shop Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {storeItems.map((item, index) => {
                        const isOwned = inventory.includes(item.id)
                        const canAfford = oro >= item.price

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "relative bg-[#1a1a1a]/80 backdrop-blur-md border rounded-xl overflow-hidden group hover:border-[#FFD700]/50 transition-all duration-300",
                                    isOwned ? "border-[#FFD700]/20" : "border-white/10"
                                )}
                            >
                                {/* Item Image Area */}
                                <div className="h-48 relative flex items-center justify-center bg-black/40 p-6">
                                    {item.type === "frame" && item.image ? (
                                        <div className="relative w-32 h-32">
                                            {/* Avatar Placeholder inside frame */}
                                            <div className="absolute inset-2 bg-neutral-800 rounded-full overflow-hidden flex items-center justify-center">
                                                <span className="text-4xl text-neutral-600">?</span>
                                            </div>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain relative z-10 mix-blend-screen"
                                                onError={(e) => {
                                                    // Fallback if image fails
                                                    e.currentTarget.style.display = 'none'
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 bg-[#FFD700]/10 rounded-full flex items-center justify-center border border-[#FFD700]/30">
                                            <Coins className="w-10 h-10 text-[#FFD700]/50" />
                                        </div>
                                    )}

                                    {isOwned && (
                                        <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1">
                                            <Check className="w-3 h-3" /> Owned
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold font-serif text-[#f0e6d2]">{item.name}</h3>
                                        <div className="flex items-center gap-1 text-[#FFD700]">
                                            <Coins className="w-4 h-4" />
                                            <span className="font-bold">{item.price}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{item.description}</p>

                                    <Button
                                        className={cn(
                                            "w-full font-bold tracking-wide",
                                            isOwned
                                                ? (item.type === "frame" && equippedFrame === item.id)
                                                    ? "bg-green-500 text-white hover:bg-green-600"
                                                    : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
                                                : canAfford
                                                    ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
                                                    : "bg-neutral-800 text-neutral-500 hover:bg-neutral-800 cursor-not-allowed"
                                        )}
                                        onClick={() => {
                                            if (isOwned) {
                                                if (item.type === "frame") equipFrame(item.id)
                                            } else if (canAfford) {
                                                handleBuy(item)
                                            }
                                        }}
                                        disabled={(isOwned && item.type !== "frame") || (!isOwned && !canAfford) || (item.type === "frame" && equippedFrame === item.id)}
                                    >
                                        {isOwned ? (
                                            item.type === "frame" ? (
                                                equippedFrame === item.id ? "Equipped" : "Equip"
                                            ) : "In Inventory"
                                        ) : canAfford ? (
                                            "Purchase"
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Lock className="w-3 h-3" /> Need {item.price - oro} more
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
