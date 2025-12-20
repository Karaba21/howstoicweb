import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/context/ThemeContext"
import { I18nProvider } from "@/context/I18nContext"
import { CartProvider } from "@/context/CartContext"
import { CartDrawer } from "@/components/layout/CartDrawer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "HowStoic | Forge Your Productivity",
  description: "Premium digital tools for modern stoics.",
}
// prueba 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
