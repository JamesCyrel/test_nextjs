import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 text-zinc-100">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl text-center backdrop-blur-md">
        <h1 className="text-4xl font-black tracking-tight text-white">lumiskn</h1>
        <p className="mt-2 text-sm text-zinc-400">Welcome to your new Next.js & Supabase application</p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 active:scale-[0.99]"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="w-full rounded-xl border border-zinc-700 bg-transparent py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800 active:scale-[0.99]"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </main>
  )
}
