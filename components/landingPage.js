import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Audiowide } from 'next/font/google'

const audiowide = Audiowide({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/black-ops.jpg"
          alt="Tactical operator with skull mask"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className={`text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mb-6 tracking-tight ${audiowide.className}`}>
          <span className="block opacity-60 bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-zinc-400/60">RAKSHAK</span>
        </h1>
        <p className="text-2xl md:text-3xl text-zinc-300/80 mb-2 font-medium">
          धर्मो रक्षति रक्षितः
        </p>
        <p className="text-sm md:text-base text-zinc-400/80 max-w-2xl mx-auto mb-8 italic">
          "Dharma protects those who protect it"
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-zinc-900 text-white hover:bg-zinc-800 min-w-[200px] font-medium border border-zinc-800"
          >
            ENLIST NOW
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-zinc-600 text-zinc-100 hover:bg-zinc-900/50 min-w-[200px] font-medium"
          >
            MISSION BRIEF
          </Button>
        </div>
      </div>

      <nav className="absolute top-0 w-full z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link 
            href="/" 
            className={`text-white text-2xl font-bold tracking-[0.2em] ${audiowide.className}`}
          >
            RAKSHAK™
          </Link>
          <div className="hidden md:flex space-x-8">
            {['Camps', 'Alerts', 'Rescue', 'Track'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`text-zinc-400 hover:text-white transition-colors tracking-wider text-sm font-medium ${audiowide.className}`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <footer className="absolute bottom-0 w-full z-20 p-4">
        <div className="container mx-auto text-center text-zinc-600 text-sm tracking-wider">
          © 2024 RAKSHAK™. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

