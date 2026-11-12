import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { signout } from '@/app/login/actions'
import { getServerAbility } from '@/lib/casl/server'
import { AbilityProvider, Can } from '@/lib/casl/client'
import Link from 'next/link'

export const instant = false

export default async function DashboardPage() {
  await connection()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?error=You must be logged in to access the dashboard')
  }

  const { user: appUser } = await getServerAbility()
  const fullName = user.user_metadata?.full_name || 'User'
  const email = user.email

  return (
    <AbilityProvider user={appUser}>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        {/* Top Header */}
        <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black tracking-tight text-white">lumiskn</span>
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                appUser?.role === 'admin'
                  ? 'border-purple-500/30 bg-purple-950/40 text-purple-300'
                  : 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300'
              }`}>
                {appUser?.role}
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

        {/* Dashboard Content */}
        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Welcome back, {fullName}!
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Role: <span className="font-semibold text-white uppercase">{appUser?.role}</span>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* User Profile Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white">Account Details</h3>
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
                  <dt className="text-zinc-400">Assigned Role</dt>
                  <dd className="font-medium uppercase text-white">{appUser?.role}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-400">User ID</dt>
                  <dd className="font-mono text-xs text-zinc-400 max-w-[200px] truncate" title={user.id}>
                    {user.id}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Role-based Permissions Panel Powered by CASL */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white">CASL Authorization Rules</h3>
              <p className="mt-1 text-xs text-zinc-400">
                Below UI items are dynamically rendered using CASL <code className="text-zinc-300">&lt;Can&gt;</code> component:
              </p>

              <div className="mt-4 space-y-3">
                {/* Admin Only Permission */}
                <Can I="manage" a="AdminDashboard">
                  <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-purple-300">Admin Control Panel</h4>
                        <p className="text-xs text-purple-400/80">You have full administrative privileges.</p>
                      </div>
                      <Link
                        href="/admin"
                        className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-500"
                      >
                        Enter Admin Area
                      </Link>
                    </div>
                  </div>
                </Can>

                {/* Regular User Permissions */}
                <Can I="read" a="Order">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <h4 className="text-sm font-semibold text-zinc-200">Customer Orders & History</h4>
                    <p className="text-xs text-zinc-400">Available to both users and admins.</p>
                  </div>
                </Can>

                {/* Shown when user CANNOT manage AdminDashboard */}
                <Can not I="manage" a="AdminDashboard">
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-3.5 text-xs text-zinc-500">
                    ℹ️ You are signed in as a standard <strong>User</strong>. Admin settings are restricted.
                  </div>
                </Can>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AbilityProvider>
  )
}
