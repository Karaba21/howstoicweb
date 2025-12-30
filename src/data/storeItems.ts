import { StoreItem } from "@/context/GamificationContext";

export const storeItems: StoreItem[] = [
    // Basic Materials
    {
        id: "frame_wood",
        name: "Oak Wood",
        description: "Simple, sturdy, and reliable. A frame for the humble stoic.",
        price: 50,
        type: "frame",
        image: "/frame-gold.png",
        color: "sepia(1) hue-rotate(-50deg) saturate(1.5) brightness(0.8)", // Brownish wood look
    },
    {
        id: "frame_stone_basic",
        name: "Limestone",
        description: "Carved from common stone. Solid and unyielding.",
        price: 100,
        type: "frame",
        image: "/frame-gold.png",
        color: "grayscale(1) brightness(1.2)", // Light Grey
    },
    {
        id: "frame_bronze",
        name: "Spartan Bronze",
        description: "Forged in the fires of discipline.",
        price: 250,
        type: "frame",
        image: "/frame-gold.png",
        color: "sepia(1) hue-rotate(-30deg) saturate(1.2) brightness(0.9)", // Bronze
        visualEffect: "metallic"
    },

    // Precious Metals
    {
        id: "frame_silver",
        name: "Athenian Silver",
        description: "Shining with the light of reason and logic.",
        price: 500,
        type: "frame",
        image: "/frame-gold.png",
        color: "grayscale(1) brightness(1.5)", // Shiny Silver
        visualEffect: "shine"
    },
    {
        id: "frame_gold",
        name: "Golden Meander",
        description: "An ornate golden frame representing the richness of wisdom.",
        price: 1000,
        type: "frame",
        image: "/frame-gold.png",
        color: "sepia(1) saturate(2) brightness(1.1)", // Enhanced Gold
        visualEffect: "shine"
    },
    {
        id: "frame_titanium",
        name: "Titanium Stoic",
        description: "Modern durability meets ancient wisdom. Unbreakable.",
        price: 2000,
        type: "frame",
        image: "/frame-gold.png",
        color: "grayscale(1) contrast(1.5) brightness(0.9)", // Dark metal
        visualEffect: "metallic"
    },

    // Gemstones / Special
    {
        id: "frame_emerald",
        name: "Emerald Vision",
        description: "Green as the nature we must live in accordance with.",
        price: 3500,
        type: "frame",
        image: "/frame-gold.png",
        color: "sepia(1) hue-rotate(60deg) saturate(3)", // Green
        visualEffect: "pulse"
    },
    {
        id: "frame_sapphire",
        name: "Sapphire Truth",
        description: "Deep blue like the depth of your character.",
        price: 5000,
        type: "frame",
        image: "/frame-gold.png",
        color: "sepia(1) hue-rotate(180deg) saturate(3)", // Blue
        visualEffect: "pulse"
    },
    {
        id: "frame_amethyst",
        name: "Royal Amethyst",
        description: "A frame for those who have mastered their own mind.",
        price: 7500,
        type: "frame",
        image: "/frame-gold.png",
        color: "sepia(1) hue-rotate(220deg) saturate(2)", // Purple
        visualEffect: "pulse"
    },
    {
        id: "frame_ruby",
        name: "Ruby Courage",
        description: "Red as the blood of those who stand their ground.",
        price: 10000,
        type: "frame",
        image: "/frame-gold.png",
        color: "sepia(1) hue-rotate(300deg) saturate(3)", // Red
        visualEffect: "pulse"
    },

    // Ultimate
    {
        id: "frame_void",
        name: "The Void",
        description: "Material goods mean nothing. Only virtue remains.",
        price: 50000,
        type: "frame",
        image: "/frame-gold.png",
        color: "grayscale(1) invert(1)", // Inverted/Dark
        visualEffect: "void"
    },

    // Rewards
    {
        id: "reward_mentorship",
        name: "1 Hour Mentorship",
        description: "A 1-on-1 session with a senior Stoic practitioner to guide your path.",
        price: 1500,
        type: "reward",
        image: "" // Placeholder logic handles empty image
    },
]
