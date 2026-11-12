import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signout } from '@/app/login/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect the dashboard - redirect to login if unauthenticated
  if (!user) {
    redirect('/login?error=You must be logged in to access the dashboard')
  }

  const fullName = user.user_metadata?.full_name || 'User'
  const email = user.email

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top Navigation */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tight text-white">lumiskn</span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-zinc-400 sm:inline-block">
              {email}
            </span>
            <form action={signout}>
              <button
                type="submit"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Welcome back, {fullName}!
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            You are securely authenticated using Supabase Auth.
          </p>
        </div>

        {/* User Info Card */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white">Profile Details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-zinc-800/80 pb-2.5">
                <dt className="text-zinc-400">Full Name</dt>
                <dd className="font-medium text-white">{fullName}</dd>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2.5">
                <dt className="text-zinc-400">Email Address</dt>
                <dd className="font-medium text-white">{email}</dd>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2.5">
                <dt className="text-zinc-400">User ID</dt>
                <dd className="font-mono text-xs text-zinc-400 max-w-[200px] truncate" title={user.id}>
                  {user.id}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-400">Last Sign In</dt>
                <dd className="text-xs text-zinc-400">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : 'Just now'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white">Next Steps for lumiskn</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400">✓</span>
                <span>Next.js App Router & Tailwind CSS configured</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400">✓</span>
                <span>Supabase server and browser clients initialized</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400">✓</span>
                <span>Login, Signup, Signout & Protected Dashboard route ready</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

