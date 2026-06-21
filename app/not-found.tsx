import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Error 404
      </div>
      <h1 className="font-heading mt-6 text-balance text-[clamp(3rem,12vw,10rem)] font-medium leading-[0.9] tracking-[-0.04em]">
        Not Found.
      </h1>
      <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2.5 rounded-full border border-border px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300 hover:bg-foreground hover:text-background"
      >
        <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
        Return Home
      </Link>
    </main>
  )
}
