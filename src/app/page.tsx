'use server'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BellRing, Youtube } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            height={1000}
            width={1000}
            src="/cover.png"
            alt="Silhouette of a warrior meditating under a waterfall"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            The Forge of Masculinity
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl">
            Break free from mediocrity. Ignite your true potential. Become the strongest version of yourself.
          </p>
          <div className="mt-8 flex space-x-4">
            <Link
              href={"https://www.youtube.com/@thesarvagyakumar"}
              className={cn(buttonVariants({
                size:"lg"
              }), "bg-red-600 hover:bg-red-700")}
            >
              <Youtube className="mr-2 h-5 w-5" />
              Subscribe Now
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-red-600 text-red-600 hover:bg-red-600/10"
            >
              <BellRing className="mr-2 h-5 w-5" />
              Get Notified
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-zinc-900 p-6">
              <h3 className="mb-3 text-white text-xl font-bold">Mental Fortitude</h3>
              <p className="text-gray-400">
                Master your mind through discipline, focus, and unwavering determination.
              </p>
            </Card>
            <Card className="bg-zinc-900 p-6">
              <h3 className="mb-3 text-white text-xl font-bold">Physical Excellence</h3>
              <p className="text-gray-400">
                Transform your body into a testament of dedication and strength.
              </p>
            </Card>
            <Card className="bg-zinc-900 p-6">
              <h3 className="mb-3 text-white text-xl font-bold">Emotional Mastery</h3>
              <p className="text-gray-400">
                Develop unshakeable emotional resilience and inner peace.
              </p>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <h2 className="mb-8 text-3xl font-bold">Join the Brotherhood</h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              This is where the warrior within awakens. No shortcuts. No apologies. Just relentless growth and unshakable
              purpose. Are you ready to begin your journey?
            </p>
            <div className="mt-8">
              <Link
                target="_blank"
                href="https://www.youtube.com/@thesarvagyakumar"
                className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}