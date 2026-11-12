'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { login } from './actions'
import { GoogleSignInButton } from '@/components/GoogleSignInButton'

function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-black tracking-tight text-white hover:text-zinc-200 transition">
            lumiskn
          </h1>
        </Link>
        <p className="mt-2 text-sm text-zinc-400">Welcome back! Please enter your details.</p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-sm text-red-300">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3.5 text-sm text-emerald-300">
          {message}
        </div>
      )}

      {/* Google OAuth Button */}
      <GoogleSignInButton label="Sign in with Google" />

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-800"></div>
        <span className="text-xs uppercase tracking-wider text-zinc-500">or with email</span>
        <div className="h-px flex-1 bg-zinc-800"></div>
      </div>

      <form action={login} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-white py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 active:scale-[0.99] shadow-md shadow-white/5"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-zinc-400">
        Don&apos;t have an account yet?{' '}
        <Link href="/signup" className="font-semibold text-white hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100">
      <Suspense fallback={<div className="text-zinc-500 text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
