import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Products } from "@/components/sections/Products"
import { Packs } from "@/components/sections/Packs"
import { Community } from "@/components/sections/Community"
import { Library } from "@/components/sections/Library"
import { Contact } from "@/components/sections/Contact"

import { getProductsInCollection } from "@/lib/shopify"

export default async function Home() {
  const shopifyProducts = await getProductsInCollection()

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />
      <div className="flex flex-col gap-0">
        <Hero />
        <Products initialProducts={shopifyProducts} />
        <Packs />
        <Community />
        <Library />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
